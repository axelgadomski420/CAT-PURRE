import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';

export default function LiveStreamsPage() {
  const [activeStreams] = useState([
    {
      id: 1,
      title: '🐱 Luna & Max playtime!',
      breeder: 'Golden British Cattery',
      viewers: 234,
      category: 'Kocięta',
      thumbnail: '/streams/stream1.jpg',
      live: true
    },
    {
      id: 2,
      title: 'Maine Coon feeding time 🍖',
      breeder: 'Maine Magic',
      viewers: 189,
      category: 'Dorosłe',
      live: true
    },
    {
      id: 3,
      title: 'British Shorthair kittens sleeping 😴',
      breeder: 'Royal Cats',
      viewers: 567,
      category: 'Kocięta',
      live: true
    }
  ]);

  return (
    <>
      <Head>
        <title>Live Streams - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="live-streams-page">
        <div className="container">
          <div className="page-header">
            <h1>🎥 Live Streams</h1>
            <p>Oglądaj koty na żywo</p>
            <button className="btn btn-primary">
              📹 Rozpocznij streaming
            </button>
          </div>

          <div className="filters">
            <button className="filter-btn active">Wszystkie</button>
            <button className="filter-btn">Kocięta</button>
            <button className="filter-btn">Dorosłe</button>
            <button className="filter-btn">Zabawa</button>
            <button className="filter-btn">Karmienie</button>
          </div>

          <div className="streams-grid">
            {activeStreams.map(stream => (
              <div key={stream.id} className="stream-card">
                <div className="stream-thumbnail">
                  <div className="live-badge">🔴 LIVE</div>
                  <div className="viewers-count">👁️ {stream.viewers}</div>
                  <span className="play-icon">▶️</span>
                </div>
                <div className="stream-info">
                  <h3>{stream.title}</h3>
                  <p className="breeder">{stream.breeder}</p>
                  <span className="category">{stream.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .live-streams-page {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .page-header h1 {
          font-size: 56px;
          margin-bottom: 16px;
        }
        .filters {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 40px;
        }
        .filter-btn {
          padding: 12px 24px;
          border: 2px solid var(--gray-200);
          background: white;
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn.active {
          border-color: var(--primary);
          background: var(--primary);
          color: white;
        }
        .streams-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .stream-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: var(--shadow-md);
        }
        .stream-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .stream-thumbnail {
          position: relative;
          padding-top: 56.25%; /* 16:9 */
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .live-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #FF3B30;
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-weight: bold;
          font-size: 12px;
        }
        .viewers-count {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 12px;
        }
        .play-icon {
          position: absolute;
          font-size: 64px;
          color: white;
          opacity: 0.8;
        }
        .stream-info {
          padding: 16px;
        }
        .stream-info h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
        }
        .breeder {
          margin: 0 0 8px 0;
          color: var(--gray-600);
          font-size: 14px;
        }
        .category {
          display: inline-block;
          padding: 4px 12px;
          background: var(--gray-100);
          border-radius: 12px;
          font-size: 12px;
        }
        @media (max-width: 768px) {
          .streams-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
