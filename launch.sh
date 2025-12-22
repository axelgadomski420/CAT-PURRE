#!/bin/zsh

echo "🚀 Starting CAT PURRE Platform..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "🍃 Starting MongoDB..."
    brew services start mongodb-community 2>/dev/null || sudo systemctl start mongodb 2>/dev/null || mongod --fork --logpath /tmp/mongodb.log
    sleep 2
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    cd server && npm install && cd ..
    cd mobile && npm install && cd ..
fi

# Seed database if empty
echo "🌱 Checking database..."
cd server && npm run seed 2>/dev/null && cd ..

echo ""
echo "✅ Starting services..."
echo ""

# Start backend
echo "🔧 Starting Backend (port 5000)..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

sleep 2

# Start frontend
echo "🎨 Starting Frontend (port 3000)..."
npm run dev &
FRONTEND_PID=$!

sleep 2

# Start mobile (optional)
# echo "📱 Starting Mobile App..."
# cd mobile && npm start &
# MOBILE_PID=$!
# cd ..

echo ""
echo "✅ CAT PURRE is running!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo "📱 Mobile:   Use Expo app"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '\n👋 Stopped all services'; exit" INT
wait
