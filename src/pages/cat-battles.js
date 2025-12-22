import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';

export default function CatBattlesPage() {
  const [currentBattle, setCurrentBattle] = useState(null);
  const [voted, setVoted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    loadDailyBattle();
  }, []);

  const loadDailyBattle = () => {
    // Daily battle (same for everyone)
    setCurrentBattle({
      id: 1,
      cat1: { id: 1, name: 'Luna', breed: 'British Shorthair', votes: 1234, emoji: '😸' },
      cat2: { id: 2, name: 'Max', breed: 'Maine Coon', votes: 987, emoji: '🦁' },
      endsAt: new Date(Date.now() + 3600000 * 12) // 12h
    });
  };

  const vote = (catId) => {
    setVoted(true);
    const total = currentBattle.cat1.votes + currentBattle.cat2.votes + 1;
    const cat1Percent = ((currentBattle.cat1.votes + (catId === 1 ? 1 : 0)) / total * 100).toFixed(1);
    const cat2Percent = (100 - cat1Percent).toFixed(1);
    
    setResults({
      cat1Percent,
      cat2Percent,
      winner: cat1Percent > cat2Percent ? 'cat1' : 'cat2'
    });
  };

  if (!currentBattle) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Cat Battles - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="battles-page">
        <div className="container">
          <h1>⚔️ Cat Battles</h1>
          <p className="subtitle">Który kot jest ładniejszy? Głosuj codziennie!</p>

          <div className="battle-arena">
            <div className="battle-header">
              <h2>🔥 Daily Battle #{currentBattle.id}</h2>
              <span className="timer">⏰ Kończy się za: 11:45:23</span>
            </div>

            <div className="vs-container">
              <button 
                className={\`cat-battle-card \${voted && results.winner === 'cat1' ? 'winner' : ''}\`}
                onClick={() => !voted && vote(1)}
                disabled={voted}
              >
                <div className="cat-avatar">{currentBattle.cat1.emoji}</div>
                <h3>{currentBattle.cat1.name}</h3>
                <p>{currentBattle.cat1.breed}</p>
                
                {voted && (
                  <div className="vote-result">
                    <div className="percentage">{results.cat1Percent}%</div>
                    <div className="vote-bar">
                      <div 
                        className="vote-fill"
                        style={{ width: \`\${results.cat1Percent}%\` }}
                      ></div>
                    </div>
                    <div className="vote-count">{currentBattle.cat1.votes + (results.winner === 'cat1' ? 1 : 0)} głosów</div>
                  </div>
                )}
              </button>

              <div className="vs-badge">VS</div>

              <button 
                className={\`cat-battle-card \${voted && results.winner === 'cat2' ? 'winner' : ''}\`}
                onClick={() => !voted && vote(2)}
                disabled={voted}
              >
                <div className="cat-avatar">{currentBattle.cat2.emoji}</div>
                <h3>{currentBattle.cat2.name}</h3>
                <p>{currentBattle.cat2.breed}</p>
                
                {voted && (
                  <div className="vote-result">
                    <div className="percentage">{results.cat2Percent}%</div>
                    <div className="vote-bar">
                      <div 
                        className="vote-fill"
                        style={{ width: \`\${results.cat2Percent}%\` }}
                      ></div>
                    </div>
                    <div className="vote-count">{currentBattle.cat2.votes + (results.winner === 'cat2' ? 1 : 0)} głosów</div>
                  </div>
                )}
              </button>
            </div>

            {!voted && (
              <p className="vote-prompt">👆 Kliknij aby zagłosować!</p>
            )}

            {voted && (
              <div className="voted-message">
                <h3>✅ Dziękujemy za głos!</h3>
                <p>Wróć jutro o 00:00 na nową bitwę</p>
                <button className="btn btn-outline">
                  📤 Podziel się wynikiem
                </button>
              </div>
            )}
          </div>

          <div className="leaderboard">
            <h2>🏆 Top koty tego tygodnia</h2>
            <div className="top-cats-list">
              <div className="top-cat-item gold">
                <span className="rank">🥇</span>
                <span className="cat-info">
                  <strong>Bella</strong> - Persian
                </span>
                <span className="wins">12 zwycięstw</span>
              </div>
              <div className="top-cat-item silver">
                <span className="rank">🥈</span>
                <span className="cat-info">
                  <strong>Luna</strong> - British Shorthair
                </span>
                <span className="wins">10 zwycięstw</span>
              </div>
              <div className="top-cat-item bronze">
                <span className="rank">🥉</span>
                <span className="cat-info">
                  <strong>Max</strong> - Maine Coon
                </span>
                <span className="wins">9 zwycięstw</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .battles-page {
          min-height: 100vh;
          padding: 40px 0;
          background: linear-gradient(135deg, #FF6B9D 0%, #FFA07A 100%);
        }
        .battles-page h1 {
          text-align: center;
          color: white;
          font-size: 56px;
          margin-bottom: 16px;
        }
        .subtitle {
          text-align: center;
          color: white;
          font-size: 20px;
          margin-bottom: 50px;
          opacity: 0.9;
        }
        .battle-arena {
          background: white;
          border-radius: 30px;
          padding: 40px;
          margin-bottom: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .battle-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .timer {
          background: var(--gray-100);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
        }
        .vs-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }
        .cat-battle-card {
          background: var(--gray-50);
          border: 3px solid transparent;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        .cat-battle-card:hover:not(:disabled) {
          border-color: var(--primary);
          background: #FFF5F8;
          transform: scale(1.05);
        }
        .cat-battle-card.winner {
          border-color: #FFD700;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: white;
          animation: celebrate 1s;
        }
        @keyframes celebrate {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
        .cat-avatar {
          font-size: 120px;
          margin-bottom: 20px;
        }
        .cat-battle-card h3 {
          font-size: 32px;
          margin: 0 0 8px 0;
        }
        .vs-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-size: 28px;
          font-weight: bold;
          align-self: center;
        }
        .vote-result {
          margin-top: 24px;
        }
        .percentage {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 12px;
        }
        .vote-bar {
          height: 12px;
          background: rgba(0,0,0,0.1);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .vote-fill {
          height: 100%;
          background: var(--primary);
          transition: width 1s ease-out;
        }
        .vote-count {
          font-size: 14px;
          opacity: 0.8;
        }
        .vote-prompt {
          text-align: center;
          font-size: 18px;
          color: var(--gray-600);
          animation: pulse 2s infinite;
        }
        .voted-message {
          text-align: center;
          padding: 30px;
          background: var(--gray-50);
          border-radius: 20px;
        }
        .leaderboard {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 30px;
          color: white;
        }
        .leaderboard h2 {
          text-align: center;
          margin-bottom: 30px;
        }
        .top-cats-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .top-cat-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          border-radius: 16px;
        }
        .top-cat-item.gold {
          background: linear-gradient(135deg, #FFD700, #FFA500);
        }
        .top-cat-item.silver {
          background: linear-gradient(135deg, #C0C0C0, #A8A8A8);
        }
        .top-cat-item.bronze {
          background: linear-gradient(135deg, #CD7F32, #B87333);
        }
        .rank {
          font-size: 32px;
        }
        .cat-info {
          flex: 1;
          font-size: 18px;
        }
        .wins {
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
