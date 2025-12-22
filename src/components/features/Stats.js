import React from 'react';

export default function Stats() {
  const stats = [
    { icon: '🐱', value: '500+', label: 'Aktywnych Kotów' },
    { icon: '🏠', value: '120+', label: 'Hodowców' },
    { icon: '😊', value: '350+', label: 'Szczęśliwych Właścicieli' },
    { icon: '⭐', value: '4.9', label: 'Średnia Ocena' }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-box">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          padding: 60px 0;
          background: white;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }
        .stat-box {
          text-align: center;
        }
        .stat-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .stat-value {
          font-size: 48px;
          font-weight: 800;
          color: #FF6B9D;
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 16px;
          color: #666;
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
