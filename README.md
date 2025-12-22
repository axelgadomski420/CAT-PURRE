# 🐱 CAT PURRE - Premium Cat Marketplace Platform

**Najlepsza platforma do kupowania kotów rasowych w Polsce z AI, Live Streaming, NFT Pedigrees i więcej!**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Funkcje

### 🎯 Core Features
- ✅ **Marketplace kotów** - Przeglądaj setki kotów od zweryfikowanych hodowców
- 🤖 **AI Assistant** - Google Gemini 2.0 pomaga znaleźć idealnego kota
- 📸 **Rozpoznawanie rasy** - Prześlij zdjęcie, AI rozpozna rasę
- 💬 **Real-time Chat** - Socket.io messaging z hodowcami
- 📹 **Video Calls** - Wirtualne wizyty u hodowcy
- 🎥 **Live Streaming** - Hodowcy streamują na żywo
- 📱 **Mobile App** - React Native (iOS + Android)

### 💎 Premium Features
- 🔨 **Aukcje** - Licytacje kotów premium
- 🧬 **DNA Testing** - Integracja z testami genetycznymi
- 🎨 **NFT Pedigrees** - Blockchain rodowody
- 🏥 **Health Tracking** - Śledzenie zdrowia kota
- 🚗 **Transport Service** - Zamów transport kota
- 🏨 **Cat Hotels** - Rezerwacja hoteli dla kotów
- 💰 **Payments** - Stripe, BLIK, Crypto, Raty
- 🔐 **Escrow** - Bezpieczne płatności

### 📱 Social Features
- 📘 **CatBook** - Social media dla kotów
- 🎵 **CatTok** - TikTok dla kotów (video platform)
- 💬 **Messaging** - Wiadomości prywatne
- 🔔 **Push Notifications** - Powiadomienia real-time

### 🧬 Breeding Features
- 📅 **Breeding Planner** - Planowanie miotów
- 🎨 **Genetic Analyzer** - Analiza genetyczna
- 👶 **Kitten Tracker** - Śledzenie rozwoju kociąt
- 📊 **Inbreeding Calculator** - Współczynnik inbreeding

## 🏗️ Architektura

\`\`\`
CAT-PURRE/
├── server/              # Backend API (Express + Socket.io)
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── server.js        # Main server
├── src/                 # Frontend (Next.js)
│   ├── pages/           # Next.js pages
│   ├── components/      # React components
│   ├── store/           # Redux store
│   ├── services/        # API services
│   └── styles/          # CSS
├── mobile/              # Mobile App (React Native)
│   ├── src/
│   └── app.json
└── database/            # Data seeds
\`\`\`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- Google Gemini API Key

### Installation

\`\`\`bash
# Clone repo
cd ~/Desktop/CAT-PURRE

# Install dependencies
npm install
cd server && npm install && cd ..
cd mobile && npm install && cd ..

# Setup environment
cp .env.example .env
# Edit .env with your API keys

# Seed database
cd server && npm run seed

# Run development
npm run dev          # Frontend (port 3000)
cd server && npm run dev   # Backend (port 5000)
cd mobile && npm start     # Mobile app
\`\`\`

Visit: http://localhost:3000

## 🔑 Environment Variables

\`\`\`env
# Server
PORT=5000
MONGODB_URI=mongodb://localhost:27017/catpurre
GEMINI_API_KEY=your_api_key

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

## 📦 Tech Stack

### Frontend
- Next.js 14
- React 18
- Redux Toolkit
- Socket.io Client
- Axios
- Framer Motion
- Ethers.js (Web3)

### Backend
- Express.js
- MongoDB + Mongoose
- Socket.io
- Google Gemini AI
- Stripe
- JWT Auth
- Multer (uploads)

### Mobile
- React Native
- Expo
- Redux Toolkit
- React Navigation

## 🎨 Design System

Apple-inspired design z:
- Inter font family
- Smooth animations
- Glass morphism
- Gradient accents
- Dark mode support

## 📊 API Endpoints

### Cats
\`\`\`
GET    /api/cats              # List cats
GET    /api/cats/:id          # Get cat
POST   /api/cats              # Create cat
PUT    /api/cats/:id          # Update cat
DELETE /api/cats/:id          # Delete cat
\`\`\`

### AI
\`\`\`
POST   /api/ai/recognize-breed    # Recognize breed from image
POST   /api/ai/chat               # Chat with AI
POST   /api/ai/match-cat          # Match cat to preferences
\`\`\`

### More APIs
- /api/auth - Authentication
- /api/breeders - Breeders
- /api/payments - Payments
- /api/auctions - Auctions
- /api/social - Social features
- /api/cattok - Video platform

## 🔐 Security

- JWT authentication
- Password hashing (bcrypt)
- Rate limiting
- CORS protection
- Helmet.js headers
- Input validation

## 📱 Mobile App

\`\`\`bash
cd mobile

# iOS
npm run ios

# Android
npm run android

# Build
expo build:ios
expo build:android
\`\`\`

## 🚀 Deployment

### Vercel (Frontend)
\`\`\`bash
vercel --prod
\`\`\`

### Railway (Backend)
\`\`\`bash
railway up
\`\`\`

### MongoDB Atlas
Use cloud MongoDB for production

## 📈 Roadmap

- [ ] Video generation AI
- [ ] AR cat preview
- [ ] Apple Pay integration
- [ ] Google Pay integration
- [ ] Veterinary integration
- [ ] Insurance platform
- [ ] Cat shows calendar
- [ ] Breeding marketplace

## 🤝 Contributing

Contributions welcome! Open issues/PRs.

## 📄 License

MIT License - see LICENSE file

## 👨‍💻 Author

Built with ❤️ for cats

## 🙏 Credits

- Google Gemini AI
- OpenAI
- Cat lovers worldwide

---

**Made in Poland 🇵🇱 | 2025**
