import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';

export default function CatSittingPage() {
  const [sitters] = useState([
    {
      id: 1,
      name: 'Anna Kowalska',
      rating: 4.9,
      reviews: 87,
      price: 45,
      experience: '5 lat',
      services: ['Wizyta domowa', 'Nocowanie', 'Podawanie leków'],
      verified: true,
      photo: '/sitters/sitter1.jpg'
    },
    {
      id: 2,
      name: 'Piotr Nowak',
      rating: 4.8,
      reviews: 65,
      price: 35,
      experience: '3 lata',
      services: ['Wizyta domowa', 'Zabawa'],
      verified: true
    }
  ]);

  return (
    <>
      <Head>
        <title>Cat Sitting - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="cat-sitting-page">
        <div className="container">
          <div className="hero">
            <h1>🏠 Opiekunowie kotów</h1>
            <p>Zaufani cat sitters w Twojej okolicy</p>
            
            <div className="search-bar">
              <input type="text" placeholder="Twoje miasto..." />
              <input type="date" placeholder="Data od" />
              <input type="date" placeholder="Data do" />
              <button className="btn btn-primary">Szukaj</button>
            </div>
          </div>

          <div className="sitters-grid">
            {sitters.map(sitter => (
              <div key={sitter.id} className="sitter-card">
                <div className="sitter-photo">
                  👤
                  {sitter.verified && <span className="verified-badge">✓</span>}
                </div>
                <div className="sitter-info">
                  <h3>{sitter.name}</h3>
                  <div className="rating">
                    ⭐ {sitter.rating} ({sitter.reviews} opinii)
                  </div>
                  <p className="experience">📅 Doświadczenie: {sitter.experience}</p>
                  <div className="services">
                    {sitter.services.map((service, idx) => (
                      <span key={idx} className="service-tag">{service}</span>
                    ))}
                  </div>
                  <div className="sitter-price">
                    <strong>{sitter.price} PLN</strong>/dzień
                  </div>
                  <button className="btn btn-primary">Zarezerwuj</button>
                </div>
              </div>
            ))}
          </div>

          <div className="become-sitter">
            <h2>Zostań opiekunem kotów</h2>
            <p>Zarabiaj opiekując się kotami w swojej okolicy</p>
            <button className="btn btn-outline btn-lg">
              Dołącz jako Cat Sitter
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cat-sitting-page {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .hero {
          text-align: center;
          margin-bottom: 60px;
        }
        .hero h1 {
          font-size: 56px;
          margin-bottom: 16px;
        }
        .search-bar {
          display: flex;
          gap: 16px;
          max-width: 900px;
          margin: 40px auto 0;
        }
        .search-bar input {
          flex: 1;
        }
        .sitters-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }
        .sitter-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          display: flex;
          gap: 24px;
          box-shadow: var(--shadow-md);
        }
        .sitter-photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 60px;
          flex-shrink: 0;
          position: relative;
        }
        .verified-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--success);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
        }
        .sitter-info {
          flex: 1;
        }
        .sitter-info h3 {
          margin: 0 0 12px 0;
        }
        .rating {
          margin-bottom: 8px;
          font-weight: 600;
        }
        .experience {
          margin: 8px 0;
          color: var(--gray-600);
        }
        .services {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin: 12px 0;
        }
        .service-tag {
          padding: 4px 12px;
          background: var(--gray-100);
          border-radius: 12px;
          font-size: 12px;
        }
        .sitter-price {
          margin: 16px 0;
          font-size: 24px;
        }
        .become-sitter {
          background: var(--gradient-secondary);
          color: white;
          padding: 60px;
          border-radius: 30px;
          text-align: center;
        }
        .become-sitter h2 {
          font-size: 40px;
          margin: 0 0 16px 0;
        }
        .become-sitter p {
          font-size: 20px;
          margin: 0 0 30px 0;
        }
        @media (max-width: 768px) {
          .sitters-grid {
            grid-template-columns: 1fr;
          }
          .sitter-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
