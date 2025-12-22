import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';

export default function HealthTrackerPage() {
  const [healthData] = useState({
    weight: [
      { date: '2025-01', value: 4.2 },
      { date: '2025-02', value: 4.3 },
      { date: '2025-03', value: 4.5 }
    ],
    vaccinations: [
      { name: 'Szczepienie podstawowe', date: '2024-06-15', next: '2025-06-15' },
      { name: 'Wścieklizna', date: '2024-07-01', next: '2025-07-01' }
    ],
    medications: [
      { name: 'Odrobaczanie', lastDate: '2025-01-15', frequency: '3 miesiące' }
    ],
    vetVisits: [
      { date: '2025-03-10', reason: 'Kontrola', vet: 'Weterynaria Cat Care' }
    ]
  });

  return (
    <>
      <Head>
        <title>Health Tracker - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="health-tracker-page">
        <div className="container">
          <h1>💊 Health Tracker</h1>
          <p className="subtitle">Monitoruj zdrowie swojego kota</p>

          <div className="dashboard-grid">
            <div className="widget">
              <h3>⚖️ Waga</h3>
              <div className="chart-placeholder">
                📈 Wykres wagi (trend: +7%)
              </div>
              <p className="current-value">Aktualnie: 4.5 kg</p>
            </div>

            <div className="widget">
              <h3>💉 Szczepienia</h3>
              <div className="upcoming-list">
                {healthData.vaccinations.map((vac, idx) => (
                  <div key={idx} className="upcoming-item">
                    <strong>{vac.name}</strong>
                    <span>Następne: {vac.next}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline btn-sm">
                + Dodaj szczepienie
              </button>
            </div>

            <div className="widget">
              <h3>💊 Leki</h3>
              {healthData.medications.map((med, idx) => (
                <div key={idx} className="med-item">
                  <strong>{med.name}</strong>
                  <p>Ostatnio: {med.lastDate}</p>
                  <p>Co {med.frequency}</p>
                </div>
              ))}
            </div>

            <div className="widget ai-insights">
              <h3>🤖 AI Insights</h3>
              <div className="insight">
                <span className="icon">⚠️</span>
                <p>Luna przytyła o 7% w ostatnim miesiącu. Rozważ zmianę diety.</p>
              </div>
              <div className="insight">
                <span className="icon">✅</span>
                <p>Wszystkie szczepienia aktualne!</p>
              </div>
              <div className="insight">
                <span className="icon">📅</span>
                <p>Za 15 dni: odrobaczanie</p>
              </div>
            </div>
          </div>

          <div className="vet-history">
            <h2>🏥 Historia wizyt u weterynarza</h2>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Powód</th>
                  <th>Weterynarz</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {healthData.vetVisits.map((visit, idx) => (
                  <tr key={idx}>
                    <td>{visit.date}</td>
                    <td>{visit.reason}</td>
                    <td>{visit.vet}</td>
                    <td>
                      <button className="btn btn-sm btn-outline">Szczegóły</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .health-tracker-page {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .health-tracker-page h1 {
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
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        .widget {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: var(--shadow-md);
        }
        .widget h3 {
          margin: 0 0 20px 0;
          font-size: 24px;
        }
        .chart-placeholder {
          background: var(--gray-50);
          padding: 60px 20px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 16px;
        }
        .current-value {
          text-align: center;
          font-size: 20px;
          font-weight: 600;
          color: var(--primary);
        }
        .upcoming-list {
          margin-bottom: 16px;
        }
        .upcoming-item {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          background: var(--gray-50);
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .med-item {
          padding: 12px;
          background: var(--gray-50);
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .med-item strong {
          display: block;
          margin-bottom: 4px;
        }
        .med-item p {
          margin: 2px 0;
          font-size: 13px;
          color: var(--gray-600);
        }
        .ai-insights {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }
        .insight {
          display: flex;
          gap: 12px;
          padding: 12px;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .insight .icon {
          font-size: 24px;
        }
        .insight p {
          margin: 0;
          font-size: 14px;
        }
        .vet-history {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: var(--shadow-md);
        }
        .vet-history h2 {
          margin: 0 0 24px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid var(--gray-200);
        }
        th {
          background: var(--gray-50);
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
