#!/bin/bash

# 🛑 Offers Today Only - Platform Stop Script
# This script stops both frontend and backend services

echo "🛑 Stopping Offers Today Only Platform..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# PID file locations
BACKEND_PID_FILE=".backend.pid"
FRONTEND_PID_FILE=".frontend.pid"

# Function to stop a process gracefully
stop_process() {
    local PID=$1
    local NAME=$2
    
    if ps -p $PID > /dev/null 2>&1; then
        echo -e "${YELLOW}Stopping $NAME (PID: $PID)...${NC}"
        kill -15 $PID 2>/dev/null  # SIGTERM for graceful shutdown
        
        # Wait up to 10 seconds for graceful shutdown
        for i in {1..10}; do
            if ! ps -p $PID > /dev/null 2>&1; then
                echo -e "${GREEN}✓ $NAME stopped gracefully${NC}"
                return 0
            fi
            sleep 1
        done
        
        # If still running, force kill
        if ps -p $PID > /dev/null 2>&1; then
            echo -e "${YELLOW}Force stopping $NAME...${NC}"
            kill -9 $PID 2>/dev/null
        fi
        echo -e "${GREEN}✓ $NAME stopped${NC}"
    fi
}

# Stop backend using PID file
if [ -f "$BACKEND_PID_FILE" ]; then
    BACKEND_PID=$(cat "$BACKEND_PID_FILE")
    stop_process "$BACKEND_PID" "Backend API"
    rm -f "$BACKEND_PID_FILE"
fi

# Stop frontend using PID file
if [ -f "$FRONTEND_PID_FILE" ]; then
    FRONTEND_PID=$(cat "$FRONTEND_PID_FILE")
    stop_process "$FRONTEND_PID" "Frontend"
    rm -f "$FRONTEND_PID_FILE"
fi

# Fallback: stop by port if PID files don't exist
# Stop backend (port 3001)
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}Stopping Backend API by port (3001)...${NC}"
    PORT_PID=$(lsof -ti:3001)
    kill -15 $PORT_PID 2>/dev/null
    sleep 2
    # Force kill if still running
    if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
        kill -9 $(lsof -ti:3001) 2>/dev/null
    fi
    echo -e "${GREEN}✓ Backend stopped${NC}"
fi

# Stop frontend (port 3000)
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}Stopping Frontend by port (3000)...${NC}"
    PORT_PID=$(lsof -ti:3000)
    kill -15 $PORT_PID 2>/dev/null
    sleep 2
    # Force kill if still running
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        kill -9 $(lsof -ti:3000) 2>/dev/null
    fi
    echo -e "${GREEN}✓ Frontend stopped${NC}"
fi

# Also kill any remaining node processes for this project
pkill -f "node server/index.js" 2>/dev/null
pkill -f "next dev" 2>/dev/null

echo ""
echo -e "${GREEN}✅ Platform stopped successfully!${NC}"
echo ""
