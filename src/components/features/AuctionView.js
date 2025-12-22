import React, { useState, useEffect } from 'react';
import AuctionService from '../../services/AuctionService';

export default function AuctionView({ auctionId }) {
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    loadAuction();
    const timer = setInterval(() => {
      updateTimeLeft();
    }, 1000);
    return () => clearInterval(timer);
  }, [auctionId]);

  const loadAuction = async () => {
    // Load auction data
    setAuction({
      id: auctionId,
      cat: { name: 'Luna', breed: 'British Shorthair', image: '/cat.jpg' },
      currentBid: 5000,
      startingPrice: 3000,
      bidCount: 12,
      endTime: new Date(Date.now() + 3600000),
      reserveMet: true
    });
  };

  const updateTimeLeft = () => {
    if (!auction) return;
    const now = new Date();
    const end = new Date(auction.endTime);
    const diff = end - now;
    
    if (diff <= 0) {
      setTimeLeft('Aukcja zakończona');
      return;
    }

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
  };

  const placeBid = async () => {
    if (!bidAmount || parseFloat(bidAmount) <= auction.currentBid) {
      alert('Oferta musi być wyższa od aktualnej!');
      return;
    }
    
    try {
      await AuctionService.placeBid(auctionId, parseFloat(bidAmount));
      loadAuction();
      setBidAmount('');
    } catch (error) {
      alert('Błąd przy składaniu oferty');
    }
  };

  if (!auction) return <div>Ładowanie...</div>;

  return (
    <div className="auction-view">
      <div className="auction-header">
        <h1>🔨 Aukcja Premium</h1>
        <div className="timer">
          ⏱️ {timeLeft}
        </div>
      </div>

      <div className="auction-content">
        <div className="auction-image">
          <img src={auction.cat.image} alt={auction.cat.name} />
          <div className="live-badge">🔴 LIVE</div>
        </div>

        <div className="auction-info">
          <h2>{auction.cat.name}</h2>
          <p className="breed">{auction.cat.breed}</p>

          <div className="bid-info">
            <div className="current-bid">
              <span className="label">Aktualna oferta</span>
              <span className="amount">{auction.currentBid.toLocaleString()} PLN</span>
            </div>
            <div className="bid-count">
              {auction.bidCount} ofert
            </div>
          </div>

          {auction.reserveMet && (
            <div className="reserve-met">✅ Cena minimalna osiągnięta</div>
          )}

          <div className="bid-form">
            <input
              type="number"
              placeholder="Twoja oferta"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={auction.currentBid + 100}
            />
            <button onClick={placeBid} className="btn btn-primary">
              🔨 Licytuj
            </button>
          </div>

          <div className="quick-bids">
            <button onClick={() => setBidAmount(auction.currentBid + 100)}>
              +100 PLN
            </button>
            <button onClick={() => setBidAmount(auction.currentBid + 500)}>
              +500 PLN
            </button>
            <button onClick={() => setBidAmount(auction.currentBid + 1000)}>
              +1000 PLN
            </button>
          </div>
        </div>
      </div>

      <div className="bid-history">
        <h3>Historia licytacji</h3>
        <div className="history-list">
          <div className="bid-item">
            <span className="bidder">user***123</span>
            <span className="amount">5,000 PLN</span>
            <span className="time">2 min temu</span>
          </div>
          <div className="bid-item">
            <span className="bidder">cat***lover</span>
            <span className="amount">4,800 PLN</span>
            <span className="time">5 min temu</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auction-view {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .auction-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .timer {
          font-size: 24px;
          font-weight: bold;
          color: #FF6B9D;
          background: #fff;
          padding: 12px 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .auction-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        .auction-image {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .auction-image img {
          width: 100%;
          height: 600px;
          object-fit: cover;
        }
        .live-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
        }
        .auction-info {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .auction-info h2 {
          font-size: 32px;
          margin: 0 0 8px 0;
        }
        .breed {
          font-size: 18px;
          color: #666;
          margin-bottom: 30px;
        }
        .bid-info {
          background: #f9f9f9;
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 20px;
        }
        .current-bid {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
        }
        .label {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        .amount {
          font-size: 36px;
          font-weight: bold;
          color: #FF6B9D;
        }
        .bid-count {
          color: #666;
          font-size: 14px;
        }
        .reserve-met {
          background: #34C759;
          color: white;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .bid-form {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .bid-form input {
          flex: 1;
        }
        .quick-bids {
          display: flex;
          gap: 8px;
        }
        .quick-bids button {
          flex: 1;
          padding: 12px;
          background: #f0f0f0;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }
        .quick-bids button:hover {
          background: #e0e0e0;
        }
        .bid-history {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .bid-item {
          display: flex;
          justify-content: space-between;
          padding: 16px;
          background: #f9f9f9;
          border-radius: 12px;
        }
        .bidder {
          font-weight: 600;
        }
        .time {
          color: #999;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
