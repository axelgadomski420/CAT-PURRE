import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

export default function MarketplacePage() {
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    loadAuctions();
    const timer = setInterval(updateTimers, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadAuctions = () => {
    // Mock data
    setActiveAuctions([
      {
        id: 1,
        catName: 'Luna Elite',
        breed: 'British Shorthair',
        currentBid: 5500,
        startingPrice: 4500,
        endTime: new Date(Date.now() + 3600000), // 1h
        bidCount: 12,
        image: '/cat1.jpg',
        breeder: 'Golden British'
      },
      {
        id: 2,
        catName: 'Max Premium',
        breed: 'Maine Coon',
        currentBid: 7200,
        startingPrice: 6500,
        endTime: new Date(Date.now() + 7200000), // 2h
        bidCount: 23,
        image: '/cat2.jpg',
        breeder: 'Maine Magic'
      }
    ]);
  };

  const updateTimers = () => {
    const newTimeLeft = {};
    activeAuctions.forEach(auction => {
      const diff = auction.endTime - new Date();
      if (diff > 0) {
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        newTimeLeft[auction.id] = \`\${hours}h \${minutes}m \${seconds}s\`;
      } else {
        newTimeLeft[auction.id] = 'Zakończona';
      }
    });
    setTimeLeft(newTimeLeft);
  };

  const placeBid = (auctionId, amount) => {
    alert(\`Licytujesz: \${amount} PLN\`);
    // API call
  };

  return (
    <>
      <Head>
        <title>Marketplace - Aukcje Kotów - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="marketplace-page">
        <div className="container">
          <div className="page-header">
            <h1>⚡ Marketplace - Aukcje Live</h1>
            <p>Licytuj unikalne koty od top hodowców</p>
          </div>

          <div className="marketplace-stats">
            <div className="stat">
              <strong>8</strong>
              <span>Aktywne aukcje</span>
            </div>
            <div className="stat">
              <strong>234</strong>
              <span>Łącznie licytacji</span>
            </div>
            <div className="stat">
              <strong>156k PLN</strong>
              <span>Wartość transakcji</span>
            </div>
          </div>

          <div className="auctions-grid">
            {activeAuctions.map(auction => (
              <div key={auction.id} className="auction-card">
                <div className="auction-badge">🔥 LIVE</div>
                
                <div className="auction-image">
                  <span className="cat-placeholder">🐱</span>
                </div>

                <div className="auction-content">
                  <h3>{auction.catName}</h3>
                  <p className="breed">{auction.breed}</p>
                  <p className="breeder">by {auction.breeder}</p>

                  <div className="auction-stats">
                    <div className="stat-item">
                      <span className="label">Aktualna cena</span>
                      <strong className="current-bid">
                        {auction.currentBid.toLocaleString()} PLN
                      </strong>
                    </div>
                    <div className="stat-item">
                      <span className="label">Czas do końca</span>
                      <strong className="time-left">
                        {timeLeft[auction.id] || 'Ładowanie...'}
                      </strong>
                    </div>
                  </div>

                  <div className="bid-info">
                    <span>{auction.bidCount} licytacji</span>
                    <span>Start: {auction.startingPrice.toLocaleString()} PLN</span>
                  </div>

                  <div className="bid-actions">
                    <input 
                      type="number" 
                      placeholder="Twoja oferta..."
                      min={auction.currentBid + 100}
                      className="bid-input"
                    />
                    <button 
                      className="btn btn-primary"
                      onClick={() => placeBid(auction.id, auction.currentBid + 100)}
                    >
                      Licytuj
                    </button>
                  </div>

                  <button className="btn btn-outline btn-sm">
                    Zobacz szczegóły
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="how-it-works">
            <h2>❓ Jak działają aukcje?</h2>
            <div className="steps-grid">
              <div className="step">
                <span className="step-number">1</span>
                <h4>Wybierz kota</h4>
                <p>Przeglądaj aktywne aukcje</p>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <h4>Licytuj</h4>
                <p>Złóż swoją ofertę</p>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <h4>Wygraj</h4>
                <p>Najwyższa oferta wygrywa</p>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <h4>Zapłać</h4>
                <p>Bezpieczna płatność online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .marketplace-page {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .page-header h1 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .marketplace-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 50px;
        }
        .marketplace-stats .stat {
          background: white;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .marketplace-stats strong {
          display: block;
          font-size: 36px;
          color: var(--primary);
          margin-bottom: 8px;
        }
        .auctions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }
        .auction-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          position: relative;
        }
        .auction-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--danger);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          z-index: 2;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .auction-image {
          height: 250px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cat-placeholder {
          font-size: 100px;
        }
        .auction-content {
          padding: 24px;
        }
        .auction-content h3 {
          font-size: 24px;
          margin: 0 0 8px 0;
        }
        .breed {
          color: var(--gray-600);
          margin: 0 0 4px 0;
        }
        .breeder {
          font-size: 14px;
          color: var(--gray-500);
          margin-bottom: 20px;
        }
        .auction-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .stat-item {
          background: var(--gray-50);
          padding: 16px;
          border-radius: 12px;
        }
        .stat-item .label {
          display: block;
          font-size: 12px;
          color: var(--gray-600);
          margin-bottom: 6px;
        }
        .current-bid {
          color: var(--primary);
          font-size: 20px;
        }
        .time-left {
          color: var(--danger);
          font-size: 16px;
        }
        .bid-info {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: var(--gray-600);
          margin-bottom: 16px;
        }
        .bid-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .bid-input {
          flex: 1;
        }
        .how-it-works {
          background: white;
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .how-it-works h2 {
          text-align: center;
          margin-bottom: 40px;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }
        .step {
          text-align: center;
        }
        .step-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          font-size: 28px;
          font-weight: bold;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .step h4 {
          margin: 0 0 8px 0;
        }
        .step p {
          margin: 0;
          color: var(--gray-600);
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .auctions-grid,
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
