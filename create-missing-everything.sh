#!/bin/zsh

echo "🔥 Tworzenie WSZYSTKIEGO co brakuje..."

# ============================================
# GLOBAL STYLES
# ============================================

mkdir -p src/styles

cat > src/styles/globals.css << 'GLOBALCSS'
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary: #FF6B9D;
  --primary-dark: #E5567F;
  --secondary: #667eea;
  --success: #34C759;
  --warning: #FF9500;
  --danger: #FF3B30;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: var(--gray-900);
  background: var(--gray-50);
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Buttons */
.btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 107, 157, 0.3);
}

.btn-secondary {
  background: var(--secondary);
  color: white;
}

.btn-outline {
  background: white;
  border: 2px solid var(--gray-200);
  color: var(--gray-700);
}

.btn-outline:hover {
  border-color: var(--primary);
  background: #FFF5F8;
  color: var(--primary);
}

.btn-lg {
  padding: 16px 32px;
  font-size: 16px;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Cards */
.card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Inputs */
input, select, textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--gray-200);
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(255, 107, 157, 0.1);
}

/* Grid */
.grid {
  display: grid;
  gap: 24px;
}

.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}

/* Utilities */
.text-center { text-align: center; }
.text-primary { color: var(--primary); }
.text-gray { color: var(--gray-600); }
.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: 8px; }
.mb-2 { margin-bottom: 16px; }
.mb-3 { margin-bottom: 24px; }
.mb-4 { margin-bottom: 32px; }
.mt-0 { margin-top: 0; }
.mt-1 { margin-top: 8px; }
.mt-2 { margin-top: 16px; }
.mt-3 { margin-top: 24px; }
.mt-4 { margin-top: 32px; }
GLOBALCSS

# ============================================
# PROTECTED ROUTE COMPONENT
# ============================================

mkdir -p src/components/auth

cat > src/components/auth/ProtectedRoute.js << 'PROTECTEDEOF'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, requireAuth = true, requireBreeder = false, requireAdmin = false }) {
  const { user, loading, isAuthenticated, isBreeder, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        router.push('/login');
      } else if (requireBreeder && !isBreeder) {
        router.push('/');
      } else if (requireAdmin && !isAdmin) {
        router.push('/');
      }
    }
  }, [loading, isAuthenticated, isBreeder, isAdmin, requireAuth, requireBreeder, requireAdmin]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div className="loader">Ładowanie...</div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) return null;
  if (requireBreeder && !isBreeder) return null;
  if (requireAdmin && !isAdmin) return null;

  return children;
}
PROTECTEDEOF

# ============================================
# HOMEPAGE - Kompletna
# ============================================

cat > src/pages/index.js << 'HOMEEOF'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import CatCard from '../components/ui/CatCard';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [featuredCats, setFeaturedCats] = useState([]);

  useEffect(() => {
    loadFeaturedCats();
  }, []);

  const loadFeaturedCats = () => {
    // Mock data
    setFeaturedCats([
      {
        id: 1,
        name: 'Luna',
        breed: 'British Shorthair',
        price: 4500,
        gender: 'female',
        age: '3 mies',
        location: 'Warszawa',
        images: ['/cat1.jpg'],
        breeder: { name: 'Golden British', verified: true },
        views: 234,
        likes: 12,
        status: 'available'
      },
      {
        id: 2,
        name: 'Max',
        breed: 'Maine Coon',
        price: 6500,
        gender: 'male',
        age: '4 mies',
        location: 'Kraków',
        images: ['/cat2.jpg'],
        breeder: { name: 'Maine Magic', verified: true },
        views: 456,
        likes: 23,
        status: 'available'
      },
      {
        id: 3,
        name: 'Bella',
        breed: 'Persian',
        price: 3800,
        gender: 'female',
        age: '2 mies',
        location: 'Gdańsk',
        images: ['/cat3.jpg'],
        breeder: { name: 'Royal Persians', verified: true },
        views: 189,
        likes: 8,
        status: 'available'
      }
    ]);
  };

  return (
    <>
      <Head>
        <title>CAT PURRE - Znajdź swojego wymarzonego kota rasowego</title>
        <meta name="description" content="Ponad 500 kotów rasowych od zweryfikowanych hodowców w Polsce" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Znajdź swojego<br />
              <span className="gradient-text">wymarzonego kota</span>
            </h1>
            <p className="hero-subtitle">
              Ponad 500 kotów rasowych od zweryfikowanych hodowców w Polsce
            </p>
            
            <div className="hero-search">
              <input 
                type="text" 
                placeholder="🔍 Szukaj rasy, lokalizacji..." 
                className="search-input"
              />
              <Link href="/cats">
                <button className="btn btn-primary btn-lg">
                  Przeglądaj koty
                </button>
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <strong>500+</strong>
                <span>Kotów</span>
              </div>
              <div className="stat">
                <strong>150+</strong>
                <span>Hodowców</span>
              </div>
              <div className="stat">
                <strong>50+</strong>
                <span>Ras</span>
              </div>
              <div className="stat">
                <strong>98%</strong>
                <span>Zadowolenia</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="floating-card card-1">
              <span className="emoji">😻</span>
              <p>British Shorthair</p>
            </div>
            <div className="floating-card card-2">
              <span className="emoji">🐱</span>
              <p>Maine Coon</p>
            </div>
            <div className="floating-card card-3">
              <span className="emoji">😺</span>
              <p>Persian</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cats */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>🔥 Wyróżnione koty</h2>
            <Link href="/cats">
              <a className="view-all">Zobacz wszystkie →</a>
            </Link>
          </div>

          <div className="cats-grid">
            {featuredCats.map(cat => (
              <CatCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Breeds */}
      <section className="section breeds-section">
        <div className="container">
          <h2 className="text-center mb-4">🏆 Popularne rasy</h2>
          
          <div className="breeds-grid">
            {['British Shorthair', 'Maine Coon', 'Persian', 'Ragdoll', 'Bengal', 'Sphynx'].map(breed => (
              <Link key={breed} href={\`/cats?breed=\${breed}\`}>
                <div className="breed-card">
                  <div className="breed-icon">🐱</div>
                  <h3>{breed}</h3>
                  <p>Zobacz koty →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features-section">
        <div className="container">
          <h2 className="text-center mb-4">✨ Dlaczego CAT PURRE?</h2>
          
          <div className="features-grid">
            <div className="feature-box">
              <span className="feature-icon">✓</span>
              <h3>Zweryfikowani hodowcy</h3>
              <p>Wszystkie hodowle są starannie weryfikowane</p>
            </div>

            <div className="feature-box">
              <span className="feature-icon">🤖</span>
              <h3>AI Assistant</h3>
              <p>Pomożemy Ci wybrać idealną rasę</p>
            </div>

            <div className="feature-box">
              <span className="feature-icon">🔒</span>
              <h3>Bezpieczne płatności</h3>
              <p>BLIK, karty, przelewy - wybierz co wolisz</p>
            </div>

            <div className="feature-box">
              <span className="feature-icon">📹</span>
              <h3>Wirtualne wizyty</h3>
              <p>Zobacz kota live przed zakupem</p>
            </div>

            <div className="feature-box">
              <span className="feature-icon">🧬</span>
              <h3>Testy DNA</h3>
              <p>Genetyka i rodowody FIFe</p>
            </div>

            <div className="feature-box">
              <span className="feature-icon">💬</span>
              <h3>Chat 24/7</h3>
              <p>Kontakt z hodowcami w czasie rzeczywistym</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Gotowy znaleźć swojego kota?</h2>
            <p>Dołącz do tysięcy zadowolonych właścicieli</p>
            <div className="cta-buttons">
              <Link href="/cats">
                <button className="btn btn-primary btn-lg">
                  Przeglądaj koty
                </button>
              </Link>
              <Link href="/ai-assistant">
                <button className="btn btn-outline btn-lg">
                  🤖 Zapytaj AI
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 100px 0;
          color: white;
        }
        .hero-content {
          max-width: 700px;
        }
        .hero-title {
          font-size: 64px;
          font-weight: bold;
          margin-bottom: 24px;
          line-height: 1.1;
        }
        .gradient-text {
          background: linear-gradient(90deg, #FF6B9D, #FFA07A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 24px;
          opacity: 0.9;
          margin-bottom: 40px;
        }
        .hero-search {
          display: flex;
          gap: 12px;
          margin-bottom: 50px;
        }
        .search-input {
          flex: 1;
          padding: 18px 24px;
          border-radius: 50px;
          border: none;
          font-size: 16px;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }
        .stat {
          text-align: center;
        }
        .stat strong {
          display: block;
          font-size: 36px;
          margin-bottom: 8px;
        }
        .stat span {
          opacity: 0.8;
        }
        .hero-image {
          position: relative;
          height: 400px;
        }
        .floating-card {
          position: absolute;
          background: white;
          color: #1a1a1a;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          animation: float 3s ease-in-out infinite;
        }
        .floating-card .emoji {
          font-size: 48px;
          display: block;
          margin-bottom: 8px;
        }
        .card-1 {
          top: 50px;
          right: 100px;
        }
        .card-2 {
          top: 200px;
          right: 300px;
          animation-delay: 1s;
        }
        .card-3 {
          top: 100px;
          right: 50px;
          animation-delay: 2s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .section {
          padding: 80px 0;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .section-header h2 {
          font-size: 36px;
          margin: 0;
        }
        .view-all {
          color: var(--primary);
          font-weight: 600;
        }
        .cats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .breeds-section {
          background: white;
        }
        .breeds-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
        }
        .breed-card {
          text-align: center;
          padding: 30px 20px;
          background: var(--gray-50);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .breed-card:hover {
          background: #FFF5F8;
          transform: translateY(-8px);
        }
        .breed-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }
        .breed-card h3 {
          margin: 0 0 8px 0;
          font-size: 16px;
        }
        .breed-card p {
          margin: 0;
          font-size: 13px;
          color: var(--primary);
        }
        .features-section {
          background: var(--gray-50);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .feature-box {
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
        }
        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          margin-bottom: 20px;
        }
        .feature-box h3 {
          margin: 0 0 12px 0;
        }
        .feature-box p {
          color: var(--gray-600);
          margin: 0;
        }
        .cta-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .cta-box {
          text-align: center;
        }
        .cta-box h2 {
          font-size: 48px;
          margin: 0 0 16px 0;
        }
        .cta-box p {
          font-size: 20px;
          opacity: 0.9;
          margin-bottom: 40px;
        }
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 40px;
          }
          .cats-grid,
          .breeds-grid,
          .features-grid {
            grid-template-columns: 1fr;
          }
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}
HOMEEOF

# ============================================
# BREEDS PAGE
# ============================================

cat > src/pages/breeds/index.js << 'BREEDSEOF'
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import { BREEDS_DATABASE } from '../../database/breeds.data';

export default function BreedsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const filteredBreeds = BREEDS_DATABASE
    .filter(breed => 
      breed.namePl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breed.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      if (sortBy === 'name') return a.namePl.localeCompare(b.namePl);
      if (sortBy === 'price') return a.priceRange.min - b.priceRange.min;
      return 0;
    });

  return (
    <>
      <Head>
        <title>Rasy kotów - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="breeds-page">
        <div className="container">
          <div className="page-header">
            <h1>📚 Encyklopedia ras kotów</h1>
            <p>Poznaj wszystkie rasy kotów dostępne na CAT PURRE</p>
          </div>

          <div className="filters-bar">
            <input
              type="text"
              placeholder="🔍 Szukaj rasy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Najpopularniejsze</option>
              <option value="name">Alfabetycznie</option>
              <option value="price">Cena rosnąco</option>
            </select>
          </div>

          <div className="breeds-grid">
            {filteredBreeds.map(breed => (
              <Link key={breed.id} href={\`/cats?breed=\${breed.nameEn}\`}>
                <div className="breed-card">
                  <div className="breed-image">
                    <span className="placeholder-emoji">🐱</span>
                  </div>

                  <div className="breed-content">
                    <h3>{breed.namePl}</h3>
                    <p className="origin">📍 {breed.origin}</p>
                    <p className="description">{breed.description}</p>

                    <div className="characteristics">
                      <span className="char">Rozmiar: {breed.characteristics.size}</span>
                      <span className="char">Aktywność: {breed.characteristics.activity}</span>
                    </div>

                    <div className="temperament-tags">
                      {breed.temperament.slice(0, 3).map((trait, idx) => (
                        <span key={idx} className="tag">{trait}</span>
                      ))}
                    </div>

                    <div className="breed-footer">
                      <span className="price">
                        {breed.priceRange.min.toLocaleString()} - {breed.priceRange.max.toLocaleString()} PLN
                      </span>
                      <span className="popularity">
                        {'⭐'.repeat(Math.floor(breed.popularity / 2))}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .breeds-page {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .page-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .page-header h1 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .page-header p {
          font-size: 18px;
          color: var(--gray-600);
        }
        .filters-bar {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
        }
        .search-input {
          flex: 1;
        }
        .breeds-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }
        .breed-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .breed-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        .breed-image {
          height: 200px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .placeholder-emoji {
          font-size: 80px;
        }
        .breed-content {
          padding: 24px;
        }
        .breed-content h3 {
          font-size: 24px;
          margin: 0 0 8px 0;
        }
        .origin {
          color: var(--gray-500);
          font-size: 14px;
          margin-bottom: 12px;
        }
        .description {
          color: var(--gray-600);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .characteristics {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }
        .char {
          font-size: 13px;
          color: var(--gray-600);
        }
        .temperament-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .tag {
          padding: 4px 12px;
          background: var(--gray-100);
          border-radius: 12px;
          font-size: 12px;
          color: var(--gray-700);
        }
        .breed-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--gray-200);
        }
        .price {
          font-weight: 600;
          color: var(--primary);
        }
        @media (max-width: 768px) {
          .breeds-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
BREEDSEOF

# ============================================
# DASHBOARD - CLIENT
# ============================================

cat > src/pages/dashboard/index.js << 'DASHEOF'
import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/ui/Navbar';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ProtectedRoute requireAuth={true}>
      <Head>
        <title>Dashboard - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="dashboard">
        <div className="container">
          <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar">
              <div className="user-profile">
                <div className="avatar">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <h3>{user?.firstName} {user?.lastName}</h3>
                <p>{user?.email}</p>
                <span className="badge">{user?.userType === 'breeder' ? '🏠 Hodowca' : '👤 Klient'}</span>
              </div>

              <nav className="sidebar-nav">
                <button 
                  className={activeTab === 'overview' ? 'active' : ''}
                  onClick={() => setActiveTab('overview')}
                >
                  📊 Przegląd
                </button>
                <button 
                  className={activeTab === 'favorites' ? 'active' : ''}
                  onClick={() => setActiveTab('favorites')}
                >
                  ❤️ Ulubione
                </button>
                <button 
                  className={activeTab === 'messages' ? 'active' : ''}
                  onClick={() => setActiveTab('messages')}
                >
                  💬 Wiadomości
                </button>
                <button 
                  className={activeTab === 'reservations' ? 'active' : ''}
                  onClick={() => setActiveTab('reservations')}
                >
                  🔒 Rezerwacje
                </button>
                <button 
                  className={activeTab === 'settings' ? 'active' : ''}
                  onClick={() => setActiveTab('settings')}
                >
                  ⚙️ Ustawienia
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
              {activeTab === 'overview' && (
                <div>
                  <h1>📊 Witaj, {user?.firstName}!</h1>
                  
                  <div className="stats-grid">
                    <div className="stat-card">
                      <span className="stat-icon">❤️</span>
                      <div>
                        <h3>8</h3>
                        <p>Ulubionych kotów</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <span className="stat-icon">💬</span>
                      <div>
                        <h3>3</h3>
                        <p>Aktywne rozmowy</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <span className="stat-icon">🔒</span>
                      <div>
                        <h3>1</h3>
                        <p>Rezerwacja</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <span className="stat-icon">👁️</span>
                      <div>
                        <h3>124</h3>
                        <p>Obejrzane koty</p>
                      </div>
                    </div>
                  </div>

                  <div className="recent-section">
                    <h2>🕐 Ostatnio oglądane</h2>
                    <p>Lista ostatnio oglądanych kotów pojawi się tutaj</p>
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div>
                  <h1>❤️ Ulubione koty</h1>
                  <p>Twoja lista ulubionych kotów pojawi się tutaj</p>
                </div>
              )}

              {activeTab === 'messages' && (
                <div>
                  <h1>💬 Wiadomości</h1>
                  <p>Twoje rozmowy z hodowcami</p>
                </div>
              )}

              {activeTab === 'reservations' && (
                <div>
                  <h1>🔒 Rezerwacje</h1>
                  <p>Twoje aktywne rezerwacje</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h1>⚙️ Ustawienia</h1>
                  <div className="settings-form">
                    <div className="form-group">
                      <label>Imię</label>
                      <input type="text" defaultValue={user?.firstName} />
                    </div>
                    <div className="form-group">
                      <label>Nazwisko</label>
                      <input type="text" defaultValue={user?.lastName} />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" defaultValue={user?.email} disabled />
                    </div>
                    <button className="btn btn-primary">Zapisz zmiany</button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .dashboard-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 30px;
        }
        .sidebar {
          background: white;
          border-radius: 20px;
          padding: 30px;
          height: fit-content;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .user-profile {
          text-align: center;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--gray-200);
          margin-bottom: 24px;
        }
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-size: 28px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .user-profile h3 {
          margin: 0 0 4px 0;
        }
        .user-profile p {
          color: var(--gray-600);
          font-size: 14px;
          margin-bottom: 12px;
        }
        .badge {
          display: inline-block;
          padding: 6px 16px;
          background: var(--gray-100);
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sidebar-nav button {
          padding: 14px 20px;
          background: transparent;
          border: none;
          border-radius: 12px;
          text-align: left;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .sidebar-nav button:hover {
          background: var(--gray-100);
        }
        .sidebar-nav button.active {
          background: var(--primary);
          color: white;
        }
        .dashboard-main {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .dashboard-main h1 {
          margin: 0 0 30px 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: var(--gray-50);
          padding: 24px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .stat-icon {
          font-size: 36px;
        }
        .stat-card h3 {
          font-size: 32px;
          margin: 0 0 4px 0;
        }
        .stat-card p {
          margin: 0;
          font-size: 14px;
          color: var(--gray-600);
        }
        .recent-section {
          padding: 30px;
          background: var(--gray-50);
          border-radius: 16px;
        }
        .recent-section h2 {
          margin: 0 0 12px 0;
        }
        .settings-form {
          max-width: 500px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .dashboard-layout {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </ProtectedRoute>
  );
}
DASHEOF

# ============================================
# .env.example
# ============================================

cat > .env.example << 'ENVEOF'
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB
MONGODB_URI=mongodb://localhost:27017/catpurre

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Cloudinary (opcjonalnie)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ENVEOF

cat > server/.env.example << 'SERVERENVEOF'
MONGODB_URI=mongodb://localhost:27017/catpurre
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=sk_test_your_stripe_key
FRONTEND_URL=http://localhost:3000
PORT=5000
SERVERENVEOF

echo "✅ WSZYSTKO UTWORZONE!"
echo ""
echo "📋 Dodane:"
echo "   ✓ globals.css (kompletne style)"
echo "   ✓ ProtectedRoute component"
echo "   ✓ HomePage (kompletna landing)"
echo "   ✓ Breeds Page (encyklopedia ras)"
echo "   ✓ Dashboard (klient)"
echo "   ✓ .env.example (dla obu: frontend + backend)"
echo ""
echo "🎨 Homepage features:"
echo "   ✓ Hero section z animacjami"
echo "   ✓ Featured cats"
echo "   ✓ Popular breeds"
echo "   ✓ Features grid"
echo "   ✓ CTA section"
echo ""

