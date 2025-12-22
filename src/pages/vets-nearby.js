import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';

export default function VetsNearbyPage() {
  const [location, setLocation] = useState(null);
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [filters, setFilters] = useState({
    distance: 10, // km
    rating: 0,
    emergency: false,
    catSpecialist: false
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          searchNearbyVets(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to Warsaw
          setLocation({ lat: 52.2297, lng: 21.0122 });
          searchNearbyVets(52.2297, 21.0122);
        }
      );
    }
  };

  const searchNearbyVets = async (lat, lng) => {
    setLoading(true);
    
    try {
      const response = await fetch(\`\${process.env.NEXT_PUBLIC_API_URL}/api/vets/nearby\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat,
          lng,
          radius: filters.distance,
          filters
        })
      });

      const data = await response.json();
      setVets(data.vets || mockVets); // Fallback to mock data
    } catch (error) {
      console.error('Error:', error);
      setVets(mockVets);
    }

    setLoading(false);
  };

  const mockVets = [
    {
      id: 1,
      name: 'Weterynaria Cat Care',
      address: 'ul. Marszałkowska 123, Warszawa',
      distance: 1.2,
      rating: 4.8,
      reviews: 234,
      phone: '+48 22 123 4567',
      emergency: true,
      catSpecialist: true,
      services: ['Konsultacje', 'Szczepienia', 'Chirugia', 'Stomatologia'],
      openNow: true,
      hours: 'Pon-Pt 8:00-20:00, Sob 9:00-16:00',
      price: '$$',
      image: '/vets/vet1.jpg'
    },
    {
      id: 2,
      name: 'Przychodnia Zwierząt VetPlus',
      address: 'ul. Nowy Świat 45, Warszawa',
      distance: 2.5,
      rating: 4.6,
      reviews: 189,
      phone: '+48 22 987 6543',
      emergency: false,
      catSpecialist: true,
      services: ['Konsultacje', 'Szczepienia', 'USG', 'RTG'],
      openNow: true,
      hours: 'Pon-Pt 9:00-19:00',
      price: '$$$',
      image: '/vets/vet2.jpg'
    },
    {
      id: 3,
      name: '24h Weterynarz Ratunkowy',
      address: 'ul. Puławska 234, Warszawa',
      distance: 3.8,
      rating: 4.9,
      reviews: 456,
      phone: '+48 22 456 7890',
      emergency: true,
      catSpecialist: false,
      services: ['24/7 Emergency', 'Intensywna terapia', 'Chirugia'],
      openNow: true,
      hours: '24/7',
      price: '$$$$',
      image: '/vets/vet3.jpg'
    }
  ];

  const callVet = (phone) => {
    window.location.href = \`tel:\${phone}\`;
  };

  const getDirections = (address) => {
    const encoded = encodeURIComponent(address);
    window.open(\`https://www.google.com/maps/dir/?api=1&destination=\${encoded}\`, '_blank');
  };

  const bookAppointment = (vet) => {
    alert(\`Rezerwacja wizyty w: \${vet.name}\`);
    // Integrate with booking system
  };

  return (
    <>
      <Head>
        <title>Weterynarze w pobliżu - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="vets-page">
        <div className="container">
          <div className="page-header">
            <h1>🏥 Weterynarze w pobliżu</h1>
            <p>Znajdź najlepszego weterynarza dla Twojego kota</p>
          </div>

          <div className="search-filters">
            <div className="filter-group">
              <label>Odległość (km)</label>
              <select 
                value={filters.distance}
                onChange={(e) => setFilters({...filters, distance: e.target.value})}
              >
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="20">20 km</option>
                <option value="50">50 km</option>
              </select>
            </div>

            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  checked={filters.emergency}
                  onChange={(e) => setFilters({...filters, emergency: e.target.checked})}
                />
                Tylko 24/7 emergency
              </label>
            </div>

            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  checked={filters.catSpecialist}
                  onChange={(e) => setFilters({...filters, catSpecialist: e.target.checked})}
                />
                Tylko specjaliści kotów
              </label>
            </div>

            <button className="btn btn-primary" onClick={() => searchNearbyVets(location.lat, location.lng)}>
              🔍 Szukaj
            </button>
          </div>

          <div className="vets-layout">
            {/* Map */}
            <div className="map-container">
              <div className="map-placeholder">
                🗺️ Mapa Google Maps
                <p>({vets.length} weterynarzy w okolicy)</p>
              </div>
            </div>

            {/* List */}
            <div className="vets-list">
              {loading ? (
                <div className="loader">Ładowanie...</div>
              ) : (
                vets.map(vet => (
                  <div key={vet.id} className="vet-card">
                    <div className="vet-image">
                      <span className="vet-placeholder">🏥</span>
                      {vet.emergency && <span className="emergency-badge">🚨 24/7</span>}
                      {vet.catSpecialist && <span className="specialist-badge">🐱 Specjalista</span>}
                    </div>

                    <div className="vet-content">
                      <div className="vet-header">
                        <h3>{vet.name}</h3>
                        <div className="vet-rating">
                          <span className="stars">⭐ {vet.rating}</span>
                          <span className="reviews">({vet.reviews} opinii)</span>
                        </div>
                      </div>

                      <p className="vet-address">📍 {vet.address}</p>
                      <p className="vet-distance">🚗 {vet.distance} km od Ciebie</p>

                      <div className="vet-services">
                        {vet.services.slice(0, 3).map((service, idx) => (
                          <span key={idx} className="service-tag">{service}</span>
                        ))}
                      </div>

                      <div className="vet-info">
                        <span className={\`status \${vet.openNow ? 'open' : 'closed'}\`}>
                          {vet.openNow ? '🟢 Otwarte' : '🔴 Zamknięte'}
                        </span>
                        <span className="hours">{vet.hours}</span>
                        <span className="price">{vet.price}</span>
                      </div>

                      <div className="vet-actions">
                        <button className="btn btn-primary" onClick={() => callVet(vet.phone)}>
                          📞 Zadzwoń
                        </button>
                        <button className="btn btn-outline" onClick={() => getDirections(vet.address)}>
                          🗺️ Dojazd
                        </button>
                        <button className="btn btn-outline" onClick={() => bookAppointment(vet)}>
                          📅 Rezerwuj
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="emergency-box">
            <h3>🚨 Nagły wypadek?</h3>
            <p>Jeśli Twój kot potrzebuje natychmiastowej pomocy:</p>
            <div className="emergency-actions">
              <button className="btn btn-danger btn-lg">
                📞 Zadzwoń 24/7: +48 22 456 7890
              </button>
              <button className="btn btn-outline btn-lg">
                🚗 Zamów Uber Pets (transport kota)
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vets-page {
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
        .search-filters {
          background: white;
          padding: 24px;
          border-radius: 20px;
          display: flex;
          gap: 20px;
          align-items: end;
          margin-bottom: 30px;
          box-shadow: var(--shadow-md);
        }
        .filter-group {
          flex: 1;
        }
        .filter-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .vets-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 40px;
        }
        .map-container {
          position: sticky;
          top: 20px;
          height: fit-content;
        }
        .map-placeholder {
          background: white;
          border-radius: 20px;
          height: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          box-shadow: var(--shadow-md);
        }
        .vets-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .vet-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          box-shadow: var(--shadow-md);
          transition: all 0.3s;
        }
        .vet-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .vet-image {
          width: 200px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }
        .vet-placeholder {
          font-size: 80px;
        }
        .emergency-badge,
        .specialist-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        .emergency-badge {
          background: var(--danger);
          color: white;
        }
        .specialist-badge {
          background: var(--success);
          color: white;
          top: 48px;
        }
        .vet-content {
          flex: 1;
          padding: 24px;
        }
        .vet-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }
        .vet-header h3 {
          margin: 0;
          font-size: 22px;
        }
        .vet-rating {
          display: flex;
          flex-direction: column;
          align-items: end;
          gap: 4px;
        }
        .stars {
          font-weight: 600;
        }
        .reviews {
          font-size: 13px;
          color: var(--gray-500);
        }
        .vet-address,
        .vet-distance {
          margin: 8px 0;
          color: var(--gray-600);
        }
        .vet-services {
          display: flex;
          gap: 8px;
          margin: 16px 0;
        }
        .service-tag {
          padding: 4px 12px;
          background: var(--gray-100);
          border-radius: 12px;
          font-size: 13px;
        }
        .vet-info {
          display: flex;
          gap: 16px;
          align-items: center;
          margin: 16px 0;
          padding: 12px 0;
          border-top: 1px solid var(--gray-200);
          border-bottom: 1px solid var(--gray-200);
        }
        .status {
          font-weight: 600;
          font-size: 14px;
        }
        .status.open {
          color: var(--success);
        }
        .status.closed {
          color: var(--danger);
        }
        .hours,
        .price {
          font-size: 14px;
          color: var(--gray-600);
        }
        .vet-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .emergency-box {
          background: linear-gradient(135deg, #FF3B30, #FF6B9D);
          color: white;
          padding: 40px;
          border-radius: 30px;
          text-align: center;
        }
        .emergency-box h3 {
          margin: 0 0 12px 0;
          font-size: 32px;
        }
        .emergency-box p {
          margin: 0 0 24px 0;
          font-size: 18px;
        }
        .emergency-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        .btn-danger {
          background: #FF3B30;
          color: white;
        }
        @media (max-width: 768px) {
          .vets-layout {
            grid-template-columns: 1fr;
          }
          .map-container {
            display: none;
          }
          .vet-card {
            flex-direction: column;
          }
          .vet-image {
            width: 100%;
            height: 150px;
          }
        }
      `}</style>
    </>
  );
}
