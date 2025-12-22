import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';

export default function BreedersMapPage() {
  const [breeders, setBreeders] = useState([]);
  const [selectedBreeder, setSelectedBreeder] = useState(null);
  const [filters, setFilters] = useState({
    breed: '',
    organization: '',
    verified: true
  });
  const [mapCenter, setMapCenter] = useState({ lat: 52.0, lng: 19.0 }); // Poland center

  useEffect(() => {
    loadBreeders();
  }, [filters]);

  const loadBreeders = async () => {
    // Load from API
    const mockBreeders = [
      {
        id: 1,
        name: 'Golden British Cattery',
        owner: 'Anna Kowalska',
        location: { lat: 52.2297, lng: 21.0122, city: 'Warszawa' },
        breeds: ['British Shorthair', 'Scottish Fold'],
        organization: 'FPL',
        registrationNumber: 'FPL-2019-1234',
        verified: true,
        verificationDate: '2024-01-15',
        activeCats: 12,
        rating: 4.9,
        reviews: 87,
        phone: '+48 123 456 789',
        email: 'golden.british@example.com',
        website: 'https://goldenbritish.pl',
        image: '/breeders/breeder1.jpg',
        certificates: [
          { org: 'FPL', number: 'FPL-2019-1234', expiry: '2026-12-31' },
          { org: 'TICA', number: 'TICA-PL-8765', expiry: '2025-12-31' }
        ]
      },
      {
        id: 2,
        name: 'Maine Magic',
        owner: 'Piotr Nowak',
        location: { lat: 50.0647, lng: 19.9450, city: 'Kraków' },
        breeds: ['Maine Coon'],
        organization: 'TICA',
        registrationNumber: 'TICA-PL-5678',
        verified: true,
        verificationDate: '2024-03-20',
        activeCats: 8,
        rating: 4.8,
        reviews: 65,
        phone: '+48 987 654 321',
        email: 'maine.magic@example.com',
        website: 'https://mainemagic.pl',
        certificates: [
          { org: 'TICA', number: 'TICA-PL-5678', expiry: '2026-06-30' }
        ]
      },
      {
        id: 3,
        name: 'Royal Persians',
        owner: 'Maria Wiśniewska',
        location: { lat: 54.3520, lng: 18.6466, city: 'Gdańsk' },
        breeds: ['Persian', 'Exotic Shorthair'],
        organization: 'WCF',
        registrationNumber: 'WCF-PL-9012',
        verified: true,
        verificationDate: '2023-11-10',
        activeCats: 15,
        rating: 4.7,
        reviews: 123,
        phone: '+48 555 123 456',
        email: 'royal.persians@example.com',
        certificates: [
          { org: 'WCF', number: 'WCF-PL-9012', expiry: '2025-11-30' },
          { org: 'FIFe', number: 'FIFE-PL-3456', expiry: '2026-01-31' }
        ]
      }
    ];

    setBreeders(mockBreeders);
  };

  const organizations = {
    FPL: { name: 'Felinological Association of Poland', color: '#FF6B9D', icon: '🇵🇱' },
    TICA: { name: 'The International Cat Association', color: '#667eea', icon: '🌍' },
    WCF: { name: 'World Cat Federation', color: '#34C759', icon: '🌎' },
    FIFe: { name: 'Fédération Internationale Féline', color: '#FF9500', icon: '🇪🇺' }
  };

  const getOrgBadge = (org) => {
    const orgInfo = organizations[org];
    return (
      <span className="org-badge" style={{ background: orgInfo.color }}>
        {orgInfo.icon} {org}
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Mapa Hodowli - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="breeders-map-page">
        <div className="map-layout">
          {/* Map */}
          <div className="map-container">
            <div className="map-header">
              <h1>🗺️ Mapa Zweryfikowanych Hodowli</h1>
              <div className="stats-bar">
                <span className="stat">
                  <strong>{breeders.length}</strong> hodowli
                </span>
                <span className="stat">
                  <strong>{breeders.filter(b => b.verified).length}</strong> zweryfikowanych
                </span>
              </div>
            </div>

            {/* Google Maps placeholder */}
            <div className="google-map">
              <div className="map-placeholder">
                <p>🗺️ Interaktywna Mapa Google Maps</p>
                <p className="map-info">
                  {breeders.length} hodowli na mapie Polski
                </p>
                
                {/* Mock map markers */}
                <div className="mock-markers">
                  {breeders.map((breeder, idx) => (
                    <div 
                      key={breeder.id}
                      className="map-marker"
                      style={{
                        top: \`\${20 + idx * 25}%\`,
                        left: \`\${30 + idx * 15}%\`
                      }}
                      onClick={() => setSelectedBreeder(breeder)}
                    >
                      📍
                      <div className="marker-tooltip">
                        {breeder.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Legend */}
            <div className="map-legend">
              <h4>Legenda:</h4>
              <div className="legend-items">
                {Object.entries(organizations).map(([key, org]) => (
                  <div key={key} className="legend-item">
                    <span className="legend-color" style={{ background: org.color }}></span>
                    {org.icon} {key} - {org.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            {/* Filters */}
            <div className="filters-card">
              <h3>🔍 Filtry</h3>
              
              <div className="form-group">
                <label>Rasa</label>
                <select 
                  value={filters.breed}
                  onChange={(e) => setFilters({...filters, breed: e.target.value})}
                >
                  <option value="">Wszystkie rasy</option>
                  <option value="British Shorthair">British Shorthair</option>
                  <option value="Maine Coon">Maine Coon</option>
                  <option value="Persian">Persian</option>
                  <option value="Bengal">Bengal</option>
                </select>
              </div>

              <div className="form-group">
                <label>Organizacja</label>
                <select 
                  value={filters.organization}
                  onChange={(e) => setFilters({...filters, organization: e.target.value})}
                >
                  <option value="">Wszystkie</option>
                  <option value="FPL">FPL</option>
                  <option value="TICA">TICA</option>
                  <option value="WCF">WCF</option>
                  <option value="FIFe">FIFe</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <input 
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => setFilters({...filters, verified: e.target.checked})}
                  />
                  Tylko zweryfikowane
                </label>
              </div>
            </div>

            {/* Selected Breeder Details */}
            {selectedBreeder ? (
              <div className="breeder-details-card">
                <button 
                  className="close-btn"
                  onClick={() => setSelectedBreeder(null)}
                >
                  ✕
                </button>

                <div className="breeder-header">
                  <div className="breeder-avatar">
                    🏠
                  </div>
                  <div>
                    <h3>{selectedBreeder.name}</h3>
                    <p className="owner">{selectedBreeder.owner}</p>
                  </div>
                  {selectedBreeder.verified && (
                    <span className="verified-badge">✓ Zweryfikowany</span>
                  )}
                </div>

                <div className="breeder-info">
                  <div className="info-row">
                    <span className="label">Lokalizacja</span>
                    <span>📍 {selectedBreeder.location.city}</span>
                  </div>

                  <div className="info-row">
                    <span className="label">Rasy</span>
                    <span>{selectedBreeder.breeds.join(', ')}</span>
                  </div>

                  <div className="info-row">
                    <span className="label">Organizacja</span>
                    {getOrgBadge(selectedBreeder.organization)}
                  </div>

                  <div className="info-row">
                    <span className="label">Nr rejestracji</span>
                    <code>{selectedBreeder.registrationNumber}</code>
                  </div>

                  <div className="info-row">
                    <span className="label">Aktywne koty</span>
                    <strong>{selectedBreeder.activeCats}</strong>
                  </div>

                  <div className="info-row">
                    <span className="label">Ocena</span>
                    <span>⭐ {selectedBreeder.rating} ({selectedBreeder.reviews} opinii)</span>
                  </div>
                </div>

                <div className="certificates">
                  <h4>📜 Certyfikaty</h4>
                  {selectedBreeder.certificates.map((cert, idx) => (
                    <div key={idx} className="certificate">
                      {getOrgBadge(cert.org)}
                      <div className="cert-details">
                        <code>{cert.number}</code>
                        <span className="expiry">Ważny do: {cert.expiry}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="breeder-actions">
                  <button className="btn btn-primary">
                    Zobacz koty
                  </button>
                  <button className="btn btn-outline">
                    Kontakt
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>👆 Kliknij hodowlę na mapie, aby zobaczyć szczegóły</p>
              </div>
            )}

            {/* Breeders List */}
            <div className="breeders-list-card">
              <h3>📋 Lista hodowli ({breeders.length})</h3>
              <div className="breeders-list">
                {breeders.map(breeder => (
                  <div 
                    key={breeder.id}
                    className="breeder-list-item"
                    onClick={() => setSelectedBreeder(breeder)}
                  >
                    <div className="breeder-list-header">
                      <strong>{breeder.name}</strong>
                      {breeder.verified && <span className="mini-badge">✓</span>}
                    </div>
                    <p className="breeder-list-location">📍 {breeder.location.city}</p>
                    {getOrgBadge(breeder.organization)}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .breeders-map-page {
          min-height: 100vh;
          background: var(--gray-50);
        }
        .map-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          height: 100vh;
        }
        .map-container {
          display: flex;
          flex-direction: column;
        }
        .map-header {
          background: white;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .map-header h1 {
          margin: 0 0 16px 0;
          font-size: 32px;
        }
        .stats-bar {
          display: flex;
          gap: 24px;
        }
        .stats-bar .stat {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stats-bar strong {
          color: var(--primary);
          font-size: 20px;
        }
        .google-map {
          flex: 1;
          position: relative;
        }
        .map-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
          position: relative;
        }
        .map-info {
          font-size: 18px;
          opacity: 0.9;
        }
        .mock-markers {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .map-marker {
          position: absolute;
          font-size: 32px;
          cursor: pointer;
          transition: transform 0.2s;
          animation: bounce 2s infinite;
        }
        .map-marker:hover {
          transform: scale(1.3);
          animation: none;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .marker-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: var(--gray-900);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .map-marker:hover .marker-tooltip {
          opacity: 1;
        }
        .map-legend {
          background: white;
          padding: 20px;
          border-top: 2px solid var(--gray-200);
        }
        .map-legend h4 {
          margin: 0 0 12px 0;
        }
        .legend-items {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }
        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
        .sidebar {
          background: var(--gray-100);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
        }
        .filters-card,
        .breeder-details-card,
        .breeders-list-card {
          background: white;
          padding: 24px;
          border-radius: 20px;
          box-shadow: var(--shadow-md);
        }
        .filters-card h3 {
          margin: 0 0 20px 0;
        }
        .breeder-details-card {
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: var(--gray-100);
          cursor: pointer;
          font-size: 16px;
        }
        .breeder-header {
          display: flex;
          gap: 16px;
          align-items: start;
          margin-bottom: 24px;
        }
        .breeder-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          flex-shrink: 0;
        }
        .breeder-header h3 {
          margin: 0;
          font-size: 20px;
        }
        .owner {
          margin: 4px 0 0 0;
          color: var(--gray-600);
          font-size: 14px;
        }
        .verified-badge {
          background: var(--success);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          margin-left: auto;
        }
        .breeder-info {
          margin-bottom: 24px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--gray-200);
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .info-row .label {
          color: var(--gray-600);
          font-size: 14px;
        }
        .info-row code {
          background: var(--gray-100);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
        }
        .org-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          color: white;
          font-size: 12px;
          font-weight: 600;
        }
        .certificates {
          margin-bottom: 24px;
          padding: 16px;
          background: var(--gray-50);
          border-radius: 12px;
        }
        .certificates h4 {
          margin: 0 0 12px 0;
        }
        .certificate {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--gray-200);
        }
        .certificate:last-child {
          border-bottom: none;
        }
        .cert-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cert-details code {
          background: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
        }
        .expiry {
          font-size: 11px;
          color: var(--gray-600);
        }
        .breeder-actions {
          display: flex;
          gap: 12px;
        }
        .no-selection {
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          color: var(--gray-500);
        }
        .breeders-list {
          max-height: 400px;
          overflow-y: auto;
        }
        .breeder-list-item {
          padding: 16px;
          border-bottom: 1px solid var(--gray-200);
          cursor: pointer;
          transition: background 0.2s;
        }
        .breeder-list-item:hover {
          background: var(--gray-50);
        }
        .breeder-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .mini-badge {
          background: var(--success);
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        .breeder-list-location {
          margin: 0 0 8px 0;
          font-size: 13px;
          color: var(--gray-600);
        }
        @media (max-width: 768px) {
          .map-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
