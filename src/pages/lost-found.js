import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';

export default function LostFoundPage() {
  const [tab, setTab] = useState('lost');

  return (
    <>
      <Head>
        <title>Zaginione & Znalezione - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="lost-found-page">
        <div className="container">
          <h1>🔍 Zaginione & Znalezione Koty</h1>
          <p className="subtitle">AI pomoże Ci znaleźć kota po zdjęciu</p>

          <div className="tabs">
            <button 
              className={`tab ${tab === 'lost' ? 'active' : ''}`}
              onClick={() => setTab('lost')}
            >
              😿 Zaginione ({47})
            </button>
            <button 
              className={`tab ${tab === 'found' ? 'active' : ''}`}
              onClick={() => setTab('found')}
            >
              😺 Znalezione ({23})
            </button>
          </div>

          <div className="action-buttons">
            <button className="btn btn-danger btn-lg">
              🚨 Zgłoś zaginionego kota
            </button>
            <button className="btn btn-success btn-lg">
              ✅ Znalazłem kota
            </button>
          </div>

          <div className="ai-match-banner">
            <h3>🤖 AI Match System</h3>
            <p>Prześlij zdjęcie - AI automatycznie porówna z bazą zaginionych kotów</p>
            <button className="btn btn-primary">
              📷 Skan zdjęcia przez AI
            </button>
          </div>

          <div className="cats-grid">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="cat-card">
                <div className="cat-photo">🐱</div>
                <div className="cat-details">
                  <h4>Luna</h4>
                  <p>British Shorthair • Szara</p>
                  <p className="location">📍 Warszawa, Mokotów</p>
                  <p className="date">⏰ Zaginęła: 2 dni temu</p>
                  <span className="reward-badge">💰 Nagroda: 500 PLN</span>
                </div>
                <button className="btn btn-outline btn-sm">
                  Szczegóły
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .lost-found-page {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .lost-found-page h1 {
          text-align: center;
          font-size: 56px;
          margin-bottom: 16px;
        }
        .subtitle {
          text-align: center;
          font-size: 20px;
          color: var(--gray-600);
          margin-bottom: 40px;
        }
        .tabs {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 30px;
        }
        .tab {
          padding: 16px 32px;
          border: none;
          background: white;
          border-radius: 16px;
          cursor: pointer;
          font-size: 18px;
          font-weight: 600;
          transition: all 0.2s;
        }
        .tab.active {
          background: var(--gradient-primary);
          color: white;
        }
        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 40px;
        }
        .ai-match-banner {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 40px;
          border-radius: 30px;
          text-align: center;
          margin-bottom: 40px;
        }
        .ai-match-banner h3 {
          margin: 0 0 12px 0;
          font-size: 32px;
        }
        .ai-match-banner p {
          margin: 0 0 24px 0;
          font-size: 18px;
        }
        .cats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .cat-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: var(--shadow-md);
        }
        .cat-photo {
          width: 100%;
          aspect-ratio: 1;
          background: var(--gradient-primary);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          margin-bottom: 16px;
        }
        .cat-details h4 {
          margin: 0 0 8px 0;
        }
        .cat-details p {
          margin: 4px 0;
          color: var(--gray-600);
          font-size: 14px;
        }
        .reward-badge {
          display: inline-block;
          margin: 12px 0;
          padding: 6px 12px;
          background: #FFD700;
          border-radius: 12px;
          font-weight: 600;
          font-size: 13px;
        }
        .cat-card .btn {
          width: 100%;
          margin-top: 12px;
        }
        @media (max-width: 768px) {
          .cats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
