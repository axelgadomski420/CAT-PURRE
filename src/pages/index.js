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
