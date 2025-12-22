#!/bin/zsh

echo "╔════════════════════════════════════════╗"
echo "║     🐱 CAT PURRE Platform Launcher    ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "${RED}✗ $1 not found${NC}"
        return 1
    else
        echo "${GREEN}✓ $1 found${NC}"
        return 0
    fi
}

# Check prerequisites
echo "${BLUE}[1/6] Checking prerequisites...${NC}"
check_command node || { echo "Please install Node.js"; exit 1; }
check_command npm || { echo "Please install npm"; exit 1; }
check_command mongod || { echo "Please install MongoDB"; exit 1; }

# Start MongoDB
echo ""
echo "${BLUE}[2/6] Starting MongoDB...${NC}"
if ! pgrep -x "mongod" > /dev/null; then
    brew services start mongodb-community 2>/dev/null || \
    sudo systemctl start mongodb 2>/dev/null || \
    mongod --fork --logpath /tmp/mongodb.log --dbpath ~/data/db
    sleep 3
    echo "${GREEN}✓ MongoDB started${NC}"
else
    echo "${YELLOW}⚠ MongoDB already running${NC}"
fi

# Install dependencies
echo ""
echo "${BLUE}[3/6] Installing dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    npm install
fi
if [ ! -d "server/node_modules" ]; then
    cd server && npm install && cd ..
fi
echo "${GREEN}✓ Dependencies installed${NC}"

# Seed database
echo ""
echo "${BLUE}[4/6] Seeding database...${NC}"
cd server && npm run seed 2>/dev/null && cd ..
echo "${GREEN}✓ Database seeded${NC}"

# Start backend
echo ""
echo "${BLUE}[5/6] Starting Backend Server...${NC}"
cd server
npm run dev &
BACKEND_PID=$!
cd ..
sleep 3
echo "${GREEN}✓ Backend running on http://localhost:5000${NC}"

# Start frontend
echo ""
echo "${BLUE}[6/6] Starting Frontend...${NC}"
npm run dev &
FRONTEND_PID=$!
sleep 3
echo "${GREEN}✓ Frontend running on http://localhost:3000${NC}"

# Done
echo ""
echo "╔════════════════════════════════════════╗"
echo "║  ✅ CAT PURRE is running!             ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "${GREEN}🌐 Frontend:${NC} http://localhost:3000"
echo "${GREEN}🔧 Backend:${NC}  http://localhost:5000"
echo "${GREEN}🍃 MongoDB:${NC}  mongodb://localhost:27017"
echo ""
echo "${YELLOW}Test Credentials:${NC}"
echo "   Email:    admin@catpurre.pl"
echo "   Password: password123"
echo ""
echo "${BLUE}📚 Documentation:${NC} README.md"
echo "${BLUE}🐛 Issues:${NC}        GitHub Issues"
echo ""
echo "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Cleanup on exit
cleanup() {
    echo ""
    echo "${YELLOW}Stopping services...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "${GREEN}✓ All services stopped${NC}"
    exit 0
}

trap cleanup INT TERM

# Wait forever
tail -f /dev/null
