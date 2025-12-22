#!/bin/zsh

echo "╔════════════════════════════════════════╗"
echo "║  🍎 CAT PURRE - macOS Installation    ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ============================================
# 1. Xcode Command Line Tools
# ============================================
echo "${BLUE}[1/8] Installing Xcode Command Line Tools...${NC}"
if ! xcode-select -p &> /dev/null; then
    echo "Installing Xcode Command Line Tools..."
    xcode-select --install
    echo "${YELLOW}⚠️  Please complete Xcode installation and run this script again${NC}"
    exit 0
else
    echo "${GREEN}✓ Xcode Command Line Tools already installed${NC}"
fi

# ============================================
# 2. Homebrew
# ============================================
echo ""
echo "${BLUE}[2/8] Installing Homebrew...${NC}"
if ! command -v brew &> /dev/null; then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == 'arm64' ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
    
    echo "${GREEN}✓ Homebrew installed${NC}"
else
    echo "${GREEN}✓ Homebrew already installed${NC}"
    brew update
fi

# ============================================
# 3. Node.js & npm
# ============================================
echo ""
echo "${BLUE}[3/8] Installing Node.js...${NC}"
if ! command -v node &> /dev/null; then
    brew install node
    echo "${GREEN}✓ Node.js installed${NC}"
else
    echo "${GREEN}✓ Node.js already installed${NC}"
fi

NODE_VERSION=$(node -v)
NPM_VERSION=$(npm -v)
echo "   Node version: ${NODE_VERSION}"
echo "   npm version: ${NPM_VERSION}"

# ============================================
# 4. MongoDB
# ============================================
echo ""
echo "${BLUE}[4/8] Installing MongoDB...${NC}"
if ! command -v mongod &> /dev/null; then
    brew tap mongodb/brew
    brew install mongodb-community@7.0
    
    # Create data directory
    mkdir -p ~/data/db
    
    echo "${GREEN}✓ MongoDB installed${NC}"
else
    echo "${GREEN}✓ MongoDB already installed${NC}"
fi

# ============================================
# 5. Git
# ============================================
echo ""
echo "${BLUE}[5/8] Installing Git...${NC}"
if ! command -v git &> /dev/null; then
    brew install git
    echo "${GREEN}✓ Git installed${NC}"
else
    echo "${GREEN}✓ Git already installed${NC}"
fi

GIT_VERSION=$(git --version)
echo "   ${GIT_VERSION}"

# ============================================
# 6. Backend Dependencies
# ============================================
echo ""
echo "${BLUE}[6/8] Installing Backend Dependencies...${NC}"
cd ~/Desktop/CAT-PURRE/server

cat > package.json << 'SERVERPKG'
{
  "name": "catpurre-server",
  "version": "1.0.0",
  "description": "CAT PURRE Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node scripts/seed.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "socket.io": "^4.6.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "@google/generative-ai": "^0.1.3",
    "multer": "^1.4.5-lts.1",
    "stripe": "^14.5.0",
    "nodemailer": "^6.9.7",
    "axios": "^1.6.2",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "morgan": "^1.10.0",
    "express-rate-limit": "^7.1.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
SERVERPKG

echo "Installing backend packages..."
npm install
echo "${GREEN}✓ Backend dependencies installed${NC}"

# ============================================
# 7. Frontend Dependencies
# ============================================
echo ""
echo "${BLUE}[7/8] Installing Frontend Dependencies...${NC}"
cd ~/Desktop/CAT-PURRE

cat > package.json << 'CLIENTPKG'
{
  "name": "catpurre-client",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-redux": "^9.0.4",
    "@reduxjs/toolkit": "^2.0.1",
    "axios": "^1.6.2",
    "socket.io-client": "^4.6.0",
    "react-i18next": "^14.0.0",
    "i18next": "^23.7.8",
    "framer-motion": "^10.16.16",
    "@google/generative-ai": "^0.1.3",
    "ethers": "^6.9.2"
  }
}
CLIENTPKG

echo "Installing frontend packages (this may take a few minutes)..."
npm install
echo "${GREEN}✓ Frontend dependencies installed${NC}"

# ============================================
# 8. Mobile Dependencies
# ============================================
echo ""
echo "${BLUE}[8/8] Installing Mobile Dependencies...${NC}"
cd ~/Desktop/CAT-PURRE/mobile

# Install Expo CLI globally
npm install -g expo-cli

cat > package.json << 'MOBILEPKG'
{
  "name": "catpurre-mobile",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios"
  },
  "dependencies": {
    "expo": "~50.0.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "react-redux": "^9.0.4",
    "@reduxjs/toolkit": "^2.0.1",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "axios": "^1.6.2",
    "socket.io-client": "^4.6.0"
  }
}
MOBILEPKG

echo "Installing mobile packages..."
npm install
echo "${GREEN}✓ Mobile dependencies installed${NC}"

# ============================================
# SUMMARY
# ============================================
cd ~/Desktop/CAT-PURRE

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  ✅ Installation Complete!            ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "${GREEN}Installed:${NC}"
echo "   ✓ Xcode Command Line Tools"
echo "   ✓ Homebrew"
echo "   ✓ Node.js $(node -v)"
echo "   ✓ npm $(npm -v)"
echo "   ✓ MongoDB"
echo "   ✓ Git $(git --version | cut -d' ' -f3)"
echo "   ✓ Backend dependencies (15 packages)"
echo "   ✓ Frontend dependencies (14 packages)"
echo "   ✓ Mobile dependencies (11 packages)"
echo ""
echo "${BLUE}Next steps:${NC}"
echo "   1. Start MongoDB:"
echo "      ${YELLOW}brew services start mongodb-community${NC}"
echo ""
echo "   2. Seed database:"
echo "      ${YELLOW}cd ~/Desktop/CAT-PURRE/server && npm run seed${NC}"
echo ""
echo "   3. Launch CAT PURRE:"
echo "      ${YELLOW}cd ~/Desktop/CAT-PURRE && ./start-catpurre.sh${NC}"
echo ""
echo "${GREEN}🎉 Ready to go!${NC}"
echo ""

