import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Znajdź swojego wymarzonego <span className="highlight">kota rasowego</span>
          </h1>
          <p className="hero-subtitle">
            Ponad 500 kotów od zweryfikowanych hodowców. AI pomaga znaleźć idealnego przyjaciela.
          </p>
          
          <div className="hero-actions">
            <Link href="/cats">
              <button className="btn btn-primary btn-lg">
                🐱 Przeglądaj koty
              </button>
            </Link>
            <Link href="/ai-assistant">
              <button className="btn btn-outline btn-lg">
                🤖 Zapytaj AI
              </button>
            </Link>
          </div>

          <div className="hero-features">
            <div className="feature">
              <span className="icon">✅</span>
              <span>Zweryfikowani hodowcy</span>
            </div>
            <div className="feature">
              <span className="icon">🤖</span>
              <span>AI asystent</span>
            </div>
            <div className="feature">
              <span className="icon">🔒</span>
              <span>Bezpieczne płatności</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="floating-card card-1">
            <img src="/demo-cat-1.jpg" alt="British Shorthair" />
            <div className="card-info">
              <span className="breed">British Shorthair</span>
              <span className="price">4,500 PLN</span>
            </div>
          </div>
          <div className="floating-card card-2">
            <img src="/demo-cat-2.jpg" alt="Maine Coon" />
            <div className="card-info">
              <span className="breed">Maine Coon</span>
              <span className="price">6,500 PLN</span>
            </div>
          </div>
          <div className="floating-card card-3">
            <img src="/demo-cat-3.jpg" alt="Persian" />
            <div className="card-info">
              <span className="breed">Persian</span>
              <span className="price">3,800 PLN</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 100px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/pattern.svg');
          opacity: 0.1;
        }
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .hero-title {
          font-size: 56px;
          font-weight: 900;
          line-height: 1.2;
          margin: 0 0 24px 0;
        }
        .highlight {
          background: linear-gradient(to right, #FF6B9D, #FFB86C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 20px;
          opacity: 0.95;
          margin-bottom: 40px;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 50px;
        }
        .hero-features {
          display: flex;
          gap: 30px;
        }
        .feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
        }
        .feature .icon {
          font-size: 20px;
        }
        .hero-image {
          position: relative;
          height: 500px;
        }
        .floating-card {
          position: absolute;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          transition: transform 0.3s;
        }
        .floating-card:hover {
          transform: translateY(-10px) scale(1.05);
        }
        .floating-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .card-info {
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #1a1a1a;
        }
        .breed {
          font-weight: 600;
        }
        .price {
          color: #FF6B9D;
          font-weight: bold;
        }
        .card-1 {
          width: 280px;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          animation: float 3s ease-in-out infinite;
        }
        .card-2 {
          width: 250px;
          top: 180px;
          left: 0;
          animation: float 3s ease-in-out infinite 1s;
        }
        .card-3 {
          width: 250px;
          top: 180px;
          right: 0;
          animation: float 3s ease-in-out infinite 2s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @media (max-width: 768px) {
          .container {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 36px;
          }
          .hero-image {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
