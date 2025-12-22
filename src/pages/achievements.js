import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

export default function AchievementsPage() {
  const { user } = useAuth();
  const [achievements] = useState({
    unlocked: [
      { id: 1, name: 'Pierwszy krok', icon: '👋', points: 10, unlockedAt: new Date() },
      { id: 2, name: 'Kot-ekspert', icon: '🏆', points: 30, unlockedAt: new Date() },
    ],
    locked: [
      { id: 3, name: 'Mój pierwszy kot', icon: '🔒', points: 50, requirement: 'Kup swojego pierwszego kota' },
      { id: 4, name: 'Tygodniowy entuzjasta', icon: '🔒', points: 100, requirement: 'Zaloguj się 7 dni z rzędu' },
    ],
    totalPoints: 40,
    level: 1,
    nextLevelPoints: 100
  });

  return (
    <ProtectedRoute requireAuth={true}>
      <Head>
        <title>Osiągnięcia - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="achievements-page">
        <div className="container">
          <div className="header">
            <h1>🏆 Osiągnięcia</h1>
            <div className="level-badge">
              <span className="level-num">Level {achievements.level}</span>
              <div className="level-progress">
                <div 
                  className="level-fill"
                  style={{ width: \`\${(achievements.totalPoints / achievements.nextLevelPoints) * 100}%\` }}
                ></div>
              </div>
              <span className="level-text">
                {achievements.totalPoints} / {achievements.nextLevelPoints} XP
              </span>
            </div>
          </div>

          <div className="achievements-grid">
            <div className="section">
              <h2>✅ Odblokowane ({achievements.unlocked.length})</h2>
              <div className="achievements-list">
                {achievements.unlocked.map(ach => (
                  <div key={ach.id} className="achievement-card unlocked">
                    <span className="achievement-icon">{ach.icon}</span>
                    <div className="achievement-info">
                      <h3>{ach.name}</h3>
                      <p className="points">+{ach.points} XP</p>
                      <p className="date">
                        {new Date(ach.unlockedAt).toLocaleDateString('pl-PL')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <h2>🔒 Do odblokowania ({achievements.locked.length})</h2>
              <div className="achievements-list">
                {achievements.locked.map(ach => (
                  <div key={ach.id} className="achievement-card locked">
                    <span className="achievement-icon">{ach.icon}</span>
                    <div className="achievement-info">
                      <h3>{ach.name}</h3>
                      <p className="requirement">{ach.requirement}</p>
                      <p className="points">+{ach.points} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .achievements-page {
          min-height: 100vh;
          padding: 40px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .header {
          text-align: center;
          color: white;
          margin-bottom: 50px;
        }
        .header h1 {
          font-size: 56px;
          margin-bottom: 30px;
        }
        .level-badge {
          display: inline-block;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 20px 40px;
          border-radius: 30px;
        }
        .level-num {
          display: block;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 12px;
        }
        .level-progress {
          width: 300px;
          height: 12px;
          background: rgba(0,0,0,0.3);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .level-fill {
          height: 100%;
          background: linear-gradient(90deg, #FFD700, #FFA500);
          transition: width 1s;
        }
        .level-text {
          font-size: 14px;
        }
        .achievements-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .section h2 {
          color: white;
          margin-bottom: 24px;
        }
        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .achievement-card {
          display: flex;
          gap: 20px;
          padding: 24px;
          border-radius: 20px;
          transition: all 0.3s;
        }
        .achievement-card.unlocked {
          background: white;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .achievement-card.locked {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          color: white;
          opacity: 0.7;
        }
        .achievement-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--gray-100);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          flex-shrink: 0;
        }
        .achievement-card.unlocked .achievement-icon {
          background: linear-gradient(135deg, #FFD700, #FFA500);
        }
        .achievement-info {
          flex: 1;
        }
        .achievement-info h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
        }
        .points {
          color: #FFD700;
          font-weight: bold;
          margin: 4px 0;
        }
        .date {
          font-size: 13px;
          opacity: 0.7;
        }
        .requirement {
          font-size: 14px;
          margin: 4px 0;
          opacity: 0.8;
        }
        @media (max-width: 768px) {
          .achievements-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </ProtectedRoute>
  );
}
