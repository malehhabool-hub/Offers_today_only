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

# Stop backend (port 3001)
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}Stopping Backend API (port 3001)...${NC}"
    kill -9 $(lsof -ti:3001) 2>/dev/null
    echo -e "${GREEN}✓ Backend stopped${NC}"
else
    echo -e "${YELLOW}⚠️  Backend is not running on port 3001${NC}"
fi

# Stop frontend (port 3000)
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}Stopping Frontend (port 3000)...${NC}"
    kill -9 $(lsof -ti:3000) 2>/dev/null
    echo -e "${GREEN}✓ Frontend stopped${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend is not running on port 3000${NC}"
fi

# Also kill any remaining node processes for this project
pkill -f "node server/index.js" 2>/dev/null
pkill -f "next dev" 2>/dev/null

echo ""
echo -e "${GREEN}✅ Platform stopped successfully!${NC}"
echo ""
