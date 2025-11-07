#!/bin/bash

# 🎁 Offers Today Only - Platform Startup Script
# This script starts both frontend and backend services

echo "🚀 Starting Offers Today Only Platform..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Dependencies not found. Installing...${NC}"
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
    cp .env.example .env
    echo ""
fi

# Create uploads directory if it doesn't exist
if [ ! -d "uploads" ]; then
    echo -e "${BLUE}📁 Creating uploads directory...${NC}"
    mkdir -p uploads
    echo ""
fi

echo -e "${GREEN}✓ Environment setup complete!${NC}"
echo ""

# Check if services are already running
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 3001 is already in use. Backend may already be running.${NC}"
else
    echo -e "${BLUE}🔌 Starting Backend API on port 3001...${NC}"
    npm run server &
    sleep 3
fi

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 3000 is already in use. Frontend may already be running.${NC}"
else
    echo -e "${BLUE}🌐 Starting Frontend on port 3000...${NC}"
    npm run dev &
    sleep 5
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Platform is starting up!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📱 Frontend:${NC}  http://localhost:3000"
echo -e "${BLUE}🔌 Backend API:${NC} http://localhost:3001"
echo ""
echo -e "${YELLOW}💡 Tip: Wait a few seconds for Next.js to compile before opening the browser${NC}"
echo ""
echo -e "To stop the platform, press ${YELLOW}Ctrl+C${NC} or run: ${YELLOW}./stop-platform.sh${NC}"
echo ""

# Keep script running
wait
