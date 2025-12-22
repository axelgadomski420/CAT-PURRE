#!/bin/zsh

echo "🎨 Tworzenie WSZYSTKICH komponentów..."

# ============================================
# FEATURED COMPONENTS
# ============================================

# FeaturedCats
cat > src/components/features/FeaturedCats.js << 'FEATEOF'
import React, { useState, useEffect } from 'react';
import CatCard from '../ui/CatCard';
import axios from 'axios';

export default function FeaturedCats() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedCats();
  }, []);

  const loadFeaturedCats = async () => {
    try {
      const response = await axios.get('/api/cats?featured=true&limit=8');
      setCats(response.data.cats || mockCats);
    } catch (error) {
      setCats(mockCats);
    }
    setLoading(false);
  };

  const mockCats = [
    { id: 1, name: 'Luna', breed: 'British Shorthair', price: 4500, age: '3 mies', gender: 'female', location: 'Warszawa', images: ['/cat1.jpg'], status: 'available', breeder: { name: 'Golden British', verified: true }, views: 234, likes: 12 },
    { id: 2, name: 'Max', breed: 'Maine Coon', price: 6500, age: '4 mies', gender: 'male', location: 'Kraków', images: ['/cat2.jpg'], status: 'available', breeder: { name: 'Maine Magic', verified: true }, views: 456, likes: 23 },
    { id: 3, name: 'Bella', breed: 'Persian', price: 3800, age: '2 mies', gender: 'female', location: 'Gdańsk', images: ['/cat3.jpg'], status: 'available', breeder: { name: 'Royal Persians', verified: true }, views: 189, likes: 8 },
    { id: 4, name: 'Leo', breed: 'Bengal', price: 7200, age: '5 mies', gender: 'male', location: 'Wrocław', images: ['/cat4.jpg'], status: 'reserved', breeder: { name: 'Wild Bengals', verified: true }, views: 567, likes: 34 }
  ];

  if (loading) return <div className="loading">Ładowanie...</div>;

  return (
    <div className="featured-cats">
      <div className="grid grid-4">
        {cats.map(cat => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}
FEATEOF

# BreedSlider
cat > src/components/features/BreedSlider.js << 'BREEDEOF'
import React, { useRef } from 'react';
import { BREEDS_DATABASE } from '../../database/breeds.data';

export default function BreedSlider() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="breed-slider">
      <button onClick={() => scroll('left')} className="scroll-btn left">←</button>
      
      <div ref={scrollRef} className="breeds-container">
        {BREEDS_DATABASE.slice(0, 10).map(breed => (
          <div key={breed.id} className="breed-card">
            <div className="breed-image">
              <img src={breed.imageUrl || '/placeholder-cat.jpg'} alt={breed.namePl} />
            </div>
            <h3>{breed.namePl}</h3>
            <p className="origin">{breed.origin}</p>
            <div className="breed-stats">
              <span>⭐ {breed.popularity}/10</span>
              <span>💰 {breed.priceRange.min}-{breed.priceRange.max} PLN</span>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={() => scroll('right')} className="scroll-btn right">→</button>

      <style jsx>{`
        .breed-slider {
          position: relative;
          padding: 40px 0;
        }
        .breeds-container {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 20px 0;
          scrollbar-width: none;
        }
        .breeds-container::-webkit-scrollbar {
          display: none;
        }
        .breed-card {
          min-width: 280px;
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s;
          cursor: pointer;
        }
        .breed-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .breed-image {
          width: 100%;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .breed-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .breed-card h3 {
          font-size: 20px;
          margin: 0 0 8px 0;
        }
        .origin {
          color: #666;
          font-size: 14px;
          margin: 0 0 12px 0;
        }
        .breed-stats {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #666;
        }
        .scroll-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
        }
        .scroll-btn.left { left: -25px; }
        .scroll-btn.right { right: -25px; }
        .scroll-btn:hover {
          background: #f5f5f5;
        }
      `}</style>
    </div>
  );
}
BREEDEOF

# HowItWorks
cat > src/components/features/HowItWorks.js << 'HOWEOF'
import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      icon: '🔍',
      title: 'Przeglądaj',
      description: 'Znajdź swojego wymarzonego kota wśród setek ofert'
    },
    {
      icon: '🤖',
      title: 'AI Pomaga',
      description: 'Skorzystaj z AI asystenta do dopasowania idealnego kota'
    },
    {
      icon: '💬',
      title: 'Kontakt',
      description: 'Napisz do hodowcy i umów się na wizytę'
    },
    {
      icon: '✅',
      title: 'Rezerwacja',
      description: 'Zarezerwuj kota i podpisz umowę online'
    },
    {
      icon: '🏠',
      title: 'Odbierz',
      description: 'Odbierz swojego nowego przyjaciela!'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="text-center">Jak to działa?</h2>
        <p className="text-center subtitle">5 prostych kroków do Twojego wymarzonego kota</p>
        
        <div className="steps">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .how-it-works {
          padding: 80px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .subtitle {
          color: rgba(255,255,255,0.9);
          font-size: 18px;
          margin-bottom: 60px;
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 30px;
        }
        .step {
          text-align: center;
          position: relative;
        }
        .step-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        .step-number {
          position: absolute;
          top: -10px;
          right: 40%;
          width: 30px;
          height: 30px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .step h3 {
          font-size: 20px;
          margin: 16px 0 8px 0;
        }
        .step p {
          color: rgba(255,255,255,0.8);
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
HOWEOF

# VerifiedBreeders
cat > src/components/features/VerifiedBreeders.js << 'VEREOF'
import React from 'react';

export default function VerifiedBreeders() {
  const breeders = [
    { id: 1, name: 'Golden British', logo: '🏆', cats: 24, rating: 4.9, verified: true, city: 'Warszawa' },
    { id: 2, name: 'Maine Magic', logo: '⭐', cats: 18, rating: 5.0, verified: true, city: 'Kraków' },
    { id: 3, name: 'Royal Persians', logo: '👑', cats: 15, rating: 4.8, verified: true, city: 'Gdańsk' },
    { id: 4, name: 'Wild Bengals', logo: '🐆', cats: 12, rating: 4.9, verified: true, city: 'Wrocław' }
  ];

  return (
    <section className="verified-breeders">
      <div className="container">
        <h2 className="text-center">Zweryfikowani Hodowcy</h2>
        <p className="text-center subtitle">Sprawdzeni i certyfikowani hodowcy</p>
        
        <div className="breeders-grid">
          {breeders.map(breeder => (
            <div key={breeder.id} className="breeder-card">
              <div className="breeder-logo">{breeder.logo}</div>
              <div className="verified-badge">✓ Zweryfikowany</div>
              <h3>{breeder.name}</h3>
              <p className="city">📍 {breeder.city}</p>
              <div className="stats">
                <span>🐱 {breeder.cats} kotów</span>
                <span>⭐ {breeder.rating}</span>
              </div>
              <button className="btn btn-outline">Zobacz profil</button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .verified-breeders {
          padding: 80px 0;
          background: #f9fafb;
        }
        .subtitle {
          color: #666;
          margin-bottom: 50px;
        }
        .breeders-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }
        .breeder-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          position: relative;
        }
        .breeder-logo {
          font-size: 64px;
          margin-bottom: 16px;
        }
        .verified-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #34C759;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .breeder-card h3 {
          margin: 12px 0 8px 0;
        }
        .city {
          color: #666;
          font-size: 14px;
          margin-bottom: 16px;
        }
        .stats {
          display: flex;
          justify-content: space-around;
          margin: 16px 0;
          font-size: 14px;
          color: #666;
        }
        @media (max-width: 768px) {
          .breeders-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
VEREOF

# Stats
cat > src/components/features/Stats.js << 'STATSEOF'
import React from 'react';

export default function Stats() {
  const stats = [
    { icon: '🐱', value: '500+', label: 'Aktywnych Kotów' },
    { icon: '🏠', value: '120+', label: 'Hodowców' },
    { icon: '😊', value: '350+', label: 'Szczęśliwych Właścicieli' },
    { icon: '⭐', value: '4.9', label: 'Średnia Ocena' }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-box">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          padding: 60px 0;
          background: white;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }
        .stat-box {
          text-align: center;
        }
        .stat-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .stat-value {
          font-size: 48px;
          font-weight: 800;
          color: #FF6B9D;
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 16px;
          color: #666;
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
STATSEOF

# Testimonials
cat > src/components/features/Testimonials.js << 'TESTEOF'
import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Anna K.',
      location: 'Warszawa',
      rating: 5,
      text: 'Kupiłam British Shorthair przez CAT PURRE. Wszystko przebiegło idealnie! Hodowca był super pomocny.',
      avatar: '👩'
    },
    {
      name: 'Piotr M.',
      location: 'Kraków',
      rating: 5,
      text: 'AI asystent pomógł mi wybrać idealną rasę. Maine Coon to najlepszy wybór jaki mogłem zrobić!',
      avatar: '👨'
    },
    {
      name: 'Karolina S.',
      location: 'Gdańsk',
      rating: 5,
      text: 'Platforma przejrzysta, hodowcy zweryfikowani. Czuję się bezpiecznie kupując tu kota.',
      avatar: '👩‍🦰'
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="text-center">Co mówią nasi klienci?</h2>
        <div className="reviews-grid">
          {reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              <div className="stars">{'⭐'.repeat(review.rating)}</div>
              <p className="review-text">"{review.text}"</p>
              <div className="reviewer">
                <span className="avatar">{review.avatar}</span>
                <div>
                  <div className="name">{review.name}</div>
                  <div className="location">📍 {review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials {
          padding: 80px 0;
          background: #f9fafb;
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 50px;
        }
        .review-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .stars {
          font-size: 20px;
          margin-bottom: 16px;
        }
        .review-text {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          margin-bottom: 20px;
          font-style: italic;
        }
        .reviewer {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .avatar {
          font-size: 40px;
        }
        .name {
          font-weight: 600;
          margin-bottom: 4px;
        }
        .location {
          font-size: 14px;
          color: #666;
        }
        @media (max-width: 768px) {
          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
TESTEOF

echo "✅ Wszystkie komponenty features utworzone"

