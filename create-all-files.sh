#!/bin/zsh

echo "🚀 Tworzenie WSZYSTKICH plików CAT PURRE..."

# Tworzenie folderów store
mkdir -p src/store/slices
mkdir -p src/styles
mkdir -p src/pages/cat
mkdir -p mobile/src/screens

# ============================================
# REDUX STORE - WSZYSTKIE PLIKI
# ============================================

# Store główny
cat > src/store/index.js << 'STOREOF'
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import catsReducer from './slices/catsSlice';
import breedersReducer from './slices/breedersSlice';
import messagesReducer from './slices/messagesSlice';
import favoritesReducer from './slices/favoritesSlice';
import aiReducer from './slices/aiSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cats: catsReducer,
    breeders: breedersReducer,
    messages: messagesReducer,
    favorites: favoritesReducer,
    ai: aiReducer,
    ui: uiReducer
  }
});

export default store;
STOREOF

# Auth Slice
cat > src/store/slices/authSlice.js << 'AUTHEOF'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
AUTHEOF

# Cats Slice
cat > src/store/slices/catsSlice.js << 'CATSEOF'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchCats = createAsyncThunk('cats/fetchCats', async (filters) => {
  const response = await axios.get(`${API_URL}/api/cats`, { params: filters });
  return response.data;
});

const catsSlice = createSlice({
  name: 'cats',
  initialState: {
    items: [],
    loading: false,
    total: 0
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCats.fulfilled, (state, action) => {
      state.items = action.payload.cats;
      state.total = action.payload.total;
    });
  }
});

export default catsSlice.reducer;
CATSEOF

# AI Slice
cat > src/store/slices/aiSlice.js << 'AIEOF'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const recognizeBreed = createAsyncThunk('ai/recognize', async (file) => {
  return { breed: 'British Shorthair', confidence: 95 };
});

const aiSlice = createSlice({
  name: 'ai',
  initialState: { breedRecognition: null, chatHistory: [] },
  reducers: {
    addChatMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    }
  }
});

export const { addChatMessage } = aiSlice.actions;
export default aiSlice.reducer;
AIEOF

# Pozostałe slice
cat > src/store/slices/breedersSlice.js << 'BEOF'
import { createSlice } from '@reduxjs/toolkit';
const breedersSlice = createSlice({
  name: 'breeders',
  initialState: { items: [] },
  reducers: {}
});
export default breedersSlice.reducer;
BEOF

cat > src/store/slices/messagesSlice.js << 'MEOF'
import { createSlice } from '@reduxjs/toolkit';
const messagesSlice = createSlice({
  name: 'messages',
  initialState: { conversations: [] },
  reducers: {}
});
export default messagesSlice.reducer;
MEOF

cat > src/store/slices/favoritesSlice.js << 'FEOF'
import { createSlice } from '@reduxjs/toolkit';
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [] },
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload);
    }
  }
});
export const { addFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
FEOF

cat > src/store/slices/uiSlice.js << 'UIEOF'
import { createSlice } from '@reduxjs/toolkit';
const uiSlice = createSlice({
  name: 'ui',
  initialState: { theme: 'light', language: 'pl' },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  }
});
export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
UIEOF

# ============================================
# STYLES - CSS
# ============================================

cat > src/styles/globals.css << 'CSSEOF'
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #FF6B9D;
  --secondary: #4A90E2;
  --success: #34C759;
  --danger: #FF3B30;
  --gray-100: #F3F4F6;
  --gray-900: #111827;
  --radius: 12px;
  --shadow: 0 4px 6px rgba(0,0,0,0.1);
}

body {
  font-family: 'Inter', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: var(--gray-900);
}

.btn {
  padding: 12px 24px;
  border-radius: var(--radius);
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: var(--shadow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.card {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.grid {
  display: grid;
  gap: 20px;
}

.grid-3 {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

input, select, textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--gray-100);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: 16px;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
}

h1 { font-size: 48px; font-weight: 800; }
h2 { font-size: 36px; font-weight: 700; }
h3 { font-size: 24px; font-weight: 600; }
CSSEOF

# ============================================
# MONGODB MODELS
# ============================================

cat > server/models/Cat.model.js << 'CATMODELEOF'
const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  birthDate: { type: Date, required: true },
  price: { type: Number, required: true },
  color: String,
  description: String,
  images: [String],
  videos: [String],
  status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available' },
  breeder: { type: mongoose.Schema.Types.ObjectId, ref: 'Breeder' },
  pedigree: {
    number: String,
    organization: String,
    father: String,
    mother: String
  },
  health: {
    vaccinations: [{ name: String, date: Date }],
    tests: [{ name: String, result: String, date: Date }],
    microchip: String
  },
  location: {
    city: String,
    voivodeship: String,
    coordinates: { lat: Number, lng: Number }
  },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cat', CatSchema);
CATMODELEOF

cat > server/models/User.model.js << 'USERMODELEOF'
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  phone: String,
  userType: { type: String, enum: ['client', 'breeder', 'admin'], default: 'client' },
  avatar: String,
  verified: { type: Boolean, default: false },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
USERMODELEOF

cat > server/models/Breeder.model.js << 'BREEDERMODELEOF'
const mongoose = require('mongoose');

const BreederSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  catteryName: { type: String, required: true },
  prefix: String,
  organization: String,
  verified: { type: Boolean, default: false },
  verificationDate: Date,
  address: {
    street: String,
    city: String,
    postalCode: String,
    voivodeship: String
  },
  contact: {
    phone: String,
    email: String,
    website: String,
    facebook: String,
    instagram: String
  },
  breeds: [String],
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  activeCats: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 }
});

module.exports = mongoose.model('Breeder', BreederSchema);
BREEDERMODELEOF

# ============================================
# ADDITIONAL COMPONENTS
# ============================================

cat > src/components/ui/Navbar.js << 'NAVEOF'
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation();
  
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link href="/">
          <span style={styles.logo}>🐱 CAT PURRE</span>
        </Link>
        
        <div style={styles.menu}>
          <Link href="/cats">Koty</Link>
          <Link href="/breeds">Rasy</Link>
          <Link href="/breeders">Hodowcy</Link>
          <Link href="/ai">AI Asystent</Link>
        </div>
        
        <div style={styles.actions}>
          <button className="btn btn-primary">Zaloguj się</button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  menu: {
    display: 'flex',
    gap: '24px'
  },
  actions: {
    display: 'flex',
    gap: '12px'
  }
};
NAVEOF

# ============================================
# FINALIZACJA
# ============================================

cat > src/pages/_app.js << 'APPEOF'
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';
import '../i18n';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
APPEOF

cat > src/pages/_document.js << 'DOCEOF'
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pl">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
DOCEOF

echo ""
echo "✅ WSZYSTKIE PLIKI UTWORZONE!"
echo ""
echo "📂 Struktura:"
echo "   - Redux Store (7 slices)"
echo "   - Styles (Apple CSS)"
echo "   - MongoDB Models (3)"
echo "   - Components (UI)"
echo "   - Pages (Next.js)"
echo ""
echo "📍 Lokalizacja: ~/Desktop/CAT-PURRE"
echo ""

