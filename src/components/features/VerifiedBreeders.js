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
