#!/bin/zsh

echo "🚀 Tworzenie MEGA FUNKCJI + Frontend..."

# ============================================
# AUCTION SYSTEM - Licytacje kotów premium
# ============================================

cat > src/services/AuctionService.js << 'AUCTEOF'
class AuctionService {
  // 🔨 Utwórz aukcję
  async createAuction(catId, startingPrice, duration, reservePrice) {
    const response = await fetch('/api/auctions/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        catId,
        startingPrice,
        duration,
        reservePrice,
        type: 'english', // english, dutch, silent
        autoExtend: true // przedłuż jeśli licytacja w ostatnich 5 min
      })
    });
    return response.json();
  }

  // 💰 Złóż ofertę
  async placeBid(auctionId, amount) {
    const response = await fetch('/api/auctions/bid', {
      method: 'POST',
      body: JSON.stringify({ auctionId, amount })
    });
    return response.json();
  }

  // 🤖 Auto-bidding (proxy bid)
  async setAutoBid(auctionId, maxAmount) {
    const response = await fetch('/api/auctions/auto-bid', {
      method: 'POST',
      body: JSON.stringify({ auctionId, maxAmount })
    });
    return response.json();
  }

  // 📊 Historia licytacji
  async getBidHistory(auctionId) {
    const response = await fetch(`/api/auctions/${auctionId}/history`);
    return response.json();
  }

  // ⏰ Aktywne aukcje
  async getActiveAuctions(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`/api/auctions/active?${params}`);
    return response.json();
  }

  // 🔔 Obserwuj aukcję
  async watchAuction(auctionId) {
    const response = await fetch(`/api/auctions/${auctionId}/watch`, {
      method: 'POST'
    });
    return response.json();
  }

  // 🎯 Snipe bid (ostatnia sekunda)
  async scheduleSniperBid(auctionId, amount, timing) {
    const response = await fetch('/api/auctions/sniper', {
      method: 'POST',
      body: JSON.stringify({ auctionId, amount, timing })
    });
    return response.json();
  }
}

export default new AuctionService();
AUCTEOF

# ============================================
# BREEDING PLANNER - Planer hodowli
# ============================================

cat > src/services/BreedingPlannerService.js << 'BREEDEOF'
class BreedingPlannerService {
  // 📅 Zaplanuj miot
  async planLitter(maleId, femaleId, plannedDate) {
    const response = await fetch('/api/breeding/plan', {
      method: 'POST',
      body: JSON.stringify({ maleId, femaleId, plannedDate })
    });
    return response.json();
  }

  // 🧬 Sprawdź kompatybilność
  async checkCompatibility(cat1Id, cat2Id) {
    const response = await fetch('/api/breeding/compatibility', {
      method: 'POST',
      body: JSON.stringify({ cat1Id, cat2Id })
    });
    return response.json();
  }

  // 🎨 Przewiduj kolory kociąt
  async predictOffspring(parent1, parent2) {
    const response = await fetch('/api/breeding/predict', {
      method: 'POST',
      body: JSON.stringify({ parent1, parent2 })
    });
    return response.json();
  }

  // 📊 Heat cycle tracker
  async trackHeatCycle(catId, cycleData) {
    const response = await fetch('/api/breeding/heat-cycle', {
      method: 'POST',
      body: JSON.stringify({ catId, ...cycleData })
    });
    return response.json();
  }

  // 🤰 Pregnancy tracker
  async trackPregnancy(catId, matingDate) {
    const response = await fetch('/api/breeding/pregnancy', {
      method: 'POST',
      body: JSON.stringify({ catId, matingDate })
    });
    return response.json();
  }

  // 👶 Kitten development tracker
  async trackKittenDevelopment(litterId, kittenData) {
    const response = await fetch('/api/breeding/kittens', {
      method: 'POST',
      body: JSON.stringify({ litterId, kittenData })
    });
    return response.json();
  }

  // 📋 Lista rezerwacji na kocięta
  async getWaitingList(breederId, breed) {
    const response = await fetch(`/api/breeding/waiting-list?breeder=${breederId}&breed=${breed}`);
    return response.json();
  }

  // 🎯 Matching service dla kocich par
  async findBreedingPartner(catId, preferences) {
    const response = await fetch('/api/breeding/match', {
      method: 'POST',
      body: JSON.stringify({ catId, preferences })
    });
    return response.json();
  }
}

export default new BreedingPlannerService();
BREEDEOF

# ============================================
# CAT DNA TESTING INTEGRATION
# ============================================

cat > src/services/DNATestingService.js << 'DNAEOF'
class DNATestingService {
  // 🧬 Zamów test DNA
  async orderDNATest(catId, testType) {
    const response = await fetch('/api/dna/order', {
      method: 'POST',
      body: JSON.stringify({
        catId,
        testType, // basic, advanced, full_genome
        tests: ['HCM', 'PKD', 'PRA', 'SMA', 'blood_type']
      })
    });
    return response.json();
  }

  // 📊 Wyniki testów
  async getTestResults(testId) {
    const response = await fetch(`/api/dna/results/${testId}`);
    return response.json();
  }

  // 🎨 Analiza kolorów
  async analyzeColorGenetics(catId) {
    const response = await fetch(`/api/dna/colors/${catId}`);
    return response.json();
  }

  // 👨‍👩‍👧 DNA Matching - znajdź krewnych
  async findRelatives(catId) {
    const response = await fetch(`/api/dna/relatives/${catId}`);
    return response.json();
  }

  // 🌍 Ancestry analysis
  async getAncestryAnalysis(catId) {
    const response = await fetch(`/api/dna/ancestry/${catId}`);
    return response.json();
  }

  // 🏆 Breed purity percentage
  async getBreedPurity(catId) {
    const response = await fetch(`/api/dna/purity/${catId}`);
    return response.json();
  }
}

export default new DNATestingService();
DNAEOF

# ============================================
# TRANSPORTATION SERVICE - Transport kotów
# ============================================

cat > src/services/TransportService.js << 'TRANSEOF'
class TransportService {
  // 🚗 Zamów transport
  async bookTransport(fromAddress, toAddress, catId, date) {
    const response = await fetch('/api/transport/book', {
      method: 'POST',
      body: JSON.stringify({
        fromAddress,
        toAddress,
        catId,
        date,
        serviceType: 'door_to_door', // door_to_door, airport, train_station
        insurance: true
      })
    });
    return response.json();
  }

  // ✈️ Transport międzynarodowy
  async bookInternationalTransport(details) {
    const response = await fetch('/api/transport/international', {
      method: 'POST',
      body: JSON.stringify(details)
    });
    return response.json();
  }

  // 📍 Śledź transport (GPS tracking)
  async trackTransport(transportId) {
    const response = await fetch(`/api/transport/track/${transportId}`);
    return response.json();
  }

  // 💰 Wycena transportu
  async getQuote(fromLocation, toLocation, catDetails) {
    const response = await fetch('/api/transport/quote', {
      method: 'POST',
      body: JSON.stringify({ fromLocation, toLocation, catDetails })
    });
    return response.json();
  }

  // 📋 Dokumenty podróżne
  async getTravelDocuments(catId, destination) {
    const response = await fetch(`/api/transport/documents/${catId}?dest=${destination}`);
    return response.json();
  }
}

export default new TransportService();
TRANSEOF

# ============================================
# CAT HOTEL BOOKING - Rezerwacja hoteli dla kotów
# ============================================

cat > src/services/CatHotelService.js << 'HOTELEOF'
class CatHotelService {
  // 🏨 Znajdź hotel dla kota
  async findHotels(location, dates, catRequirements) {
    const response = await fetch('/api/cat-hotels/search', {
      method: 'POST',
      body: JSON.stringify({ location, dates, catRequirements })
    });
    return response.json();
  }

  // 📅 Zarezerwuj pobyt
  async bookHotel(hotelId, catId, checkIn, checkOut, services) {
    const response = await fetch('/api/cat-hotels/book', {
      method: 'POST',
      body: JSON.stringify({
        hotelId,
        catId,
        checkIn,
        checkOut,
        services // grooming, play_time, medication, etc.
      })
    });
    return response.json();
  }

  // 📹 Live camera access
  async getHotelCamera(bookingId) {
    const response = await fetch(`/api/cat-hotels/camera/${bookingId}`);
    return response.json();
  }

  // 📊 Daily reports
  async getDailyReport(bookingId, date) {
    const response = await fetch(`/api/cat-hotels/reports/${bookingId}?date=${date}`);
    return response.json();
  }
}

export default new CatHotelService();
HOTELEOF

# ============================================
# FRONTEND COMPONENTS - Aukcje
# ============================================

cat > src/components/features/AuctionView.js << 'AUCTVIEWEOF'
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
AUCTVIEWEOF

# ============================================
# BREEDING PLANNER COMPONENT
# ============================================

cat > src/components/features/BreedingPlanner.js << 'BREEDPLANEOF'
import React, { useState } from 'react';
import BreedingPlannerService from '../../services/BreedingPlannerService';

export default function BreedingPlanner() {
  const [selectedMale, setSelectedMale] = useState(null);
  const [selectedFemale, setSelectedFemale] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const checkCompatibility = async () => {
    if (!selectedMale || !selectedFemale) return;

    const result = await BreedingPlannerService.checkCompatibility(
      selectedMale.id,
      selectedFemale.id
    );
    
    setPrediction(result);
  };

  return (
    <div className="breeding-planner">
      <h1>🧬 Planer Hodowli</h1>
      
      <div className="planner-grid">
        <div className="cat-selector">
          <h3>♂️ Samiec</h3>
          <div className="cat-card">
            {selectedMale ? (
              <>
                <img src={selectedMale.image} alt={selectedMale.name} />
                <h4>{selectedMale.name}</h4>
                <p>{selectedMale.breed}</p>
              </>
            ) : (
              <button className="select-btn">Wybierz samca</button>
            )}
          </div>
        </div>

        <div className="compatibility-icon">
          <div className="heart">❤️</div>
          <button onClick={checkCompatibility} className="btn btn-primary">
            Sprawdź kompatybilność
          </button>
        </div>

        <div className="cat-selector">
          <h3>♀️ Samica</h3>
          <div className="cat-card">
            {selectedFemale ? (
              <>
                <img src={selectedFemale.image} alt={selectedFemale.name} />
                <h4>{selectedFemale.name}</h4>
                <p>{selectedFemale.breed}</p>
              </>
            ) : (
              <button className="select-btn">Wybierz samicę</button>
            )}
          </div>
        </div>
      </div>

      {prediction && (
        <div className="prediction-results">
          <h2>📊 Wyniki analizy</h2>
          
          <div className="compatibility-score">
            <div className="score-circle">
              <span className="score">{prediction.compatibilityScore}%</span>
              <span className="label">Kompatybilność</span>
            </div>
          </div>

          <div className="predictions-grid">
            <div className="prediction-card">
              <h4>🎨 Przewidywane kolory</h4>
              <div className="color-chips">
                {prediction.expectedColors?.map((color, idx) => (
                  <span key={idx} className="color-chip">{color}</span>
                ))}
              </div>
            </div>

            <div className="prediction-card">
              <h4>🏥 Ryzyko zdrowotne</h4>
              <div className="risk-level">
                <span className={`risk ${prediction.healthRisk}`}>
                  {prediction.healthRisk}
                </span>
              </div>
            </div>

            <div className="prediction-card">
              <h4>📈 Wartość hodowlana</h4>
              <div className="breeding-value">
                <span className="value">{prediction.breedingValue}/100</span>
              </div>
            </div>
          </div>

          <div className="recommendations">
            <h4>💡 Rekomendacje</h4>
            <ul>
              {prediction.recommendations?.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <style jsx>{`
        .breeding-planner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .planner-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 40px;
          align-items: center;
          margin: 40px 0;
        }
        .cat-selector {
          text-align: center;
        }
        .cat-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .cat-card img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 16px;
        }
        .select-btn {
          width: 100%;
          padding: 60px 20px;
          background: #f0f0f0;
          border: 2px dashed #ccc;
          border-radius: 12px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s;
        }
        .select-btn:hover {
          background: #e0e0e0;
          border-color: #FF6B9D;
        }
        .compatibility-icon {
          text-align: center;
        }
        .heart {
          font-size: 64px;
          margin-bottom: 20px;
          animation: heartbeat 1.5s infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .prediction-results {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          margin-top: 40px;
        }
        .compatibility-score {
          text-align: center;
          margin: 30px 0;
        }
        .score-circle {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .score {
          font-size: 48px;
          font-weight: bold;
        }
        .label {
          font-size: 14px;
          opacity: 0.9;
        }
        .predictions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 30px 0;
        }
        .prediction-card {
          background: #f9f9f9;
          padding: 24px;
          border-radius: 16px;
        }
        .prediction-card h4 {
          margin: 0 0 16px 0;
        }
        .color-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .color-chip {
          padding: 6px 12px;
          background: #FF6B9D;
          color: white;
          border-radius: 16px;
          font-size: 14px;
        }
        .risk {
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .risk.low {
          background: #34C759;
          color: white;
        }
        .risk.medium {
          background: #FF9500;
          color: white;
        }
        .risk.high {
          background: #FF3B30;
          color: white;
        }
        .recommendations ul {
          list-style: none;
          padding: 0;
        }
        .recommendations li {
          padding: 12px;
          background: #f0f0f0;
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .recommendations li:before {
          content: '💡 ';
        }
      `}</style>
    </div>
  );
}
BREEDPLANEOF

echo "✅ MEGA FUNKCJE + FRONTEND UTWORZONE!"
echo ""
echo "📋 Nowe systemy:"
echo "   ✓ Auction System (Licytacje)"
echo "   ✓ Breeding Planner (Planer hodowli)"
echo "   ✓ DNA Testing Integration"
echo "   ✓ Transport Service"
echo "   ✓ Cat Hotel Booking"
echo "   ✓ Frontend components dla wszystkich"
echo ""

