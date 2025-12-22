import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import { useAuth } from '../context/AuthContext';

export default function DailyCatPage() {
  const { user } = useAuth();
  const [todaysCat, setTodaysCat] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [won, setWon] = useState(false);
  const [streak, setStreak] = useState(0);
  const [hints, setHints] = useState({
    hint1: false,
    hint2: false,
    hint3: false
  });

  useEffect(() => {
    loadDailyCat();
    loadStreak();
  }, []);

  const loadDailyCat = () => {
    // Daily cat (same for everyone today)
    const dailyCats = [
      { id: 1, breed: 'British Shorthair', clues: ['Pluszowe futro', 'Z UK', 'Okrągła twarz'] },
      { id: 2, breed: 'Maine Coon', clues: ['Gigantyczny', 'Z USA', 'Puchate uszy'] },
      { id: 3, breed: 'Persian', clues: ['Długie futro', 'Z Iranu', 'Płaska twarz'] }
    ];
    
    const dayIndex = Math.floor(Date.now() / 86400000) % dailyCats.length;
    setTodaysCat(dailyCats[dayIndex]);
  };

  const loadStreak = () => {
    const savedStreak = localStorage.getItem('catMatchStreak') || 0;
    setStreak(parseInt(savedStreak));
  };

  const makeGuess = () => {
    if (!guess.trim()) return;

    const newAttempts = [...attempts, guess];
    setAttempts(newAttempts);

    if (guess.toLowerCase() === todaysCat.breed.toLowerCase()) {
      setWon(true);
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('catMatchStreak', newStreak);
      localStorage.setItem('lastPlayed', new Date().toDateString());
    }

    setGuess('');
  };

  const revealHint = (hintNum) => {
    setHints({...hints, [\`hint\${hintNum}\`]: true});
  };

  const shareResult = () => {
    const emoji = won ? '🎉' : '😿';
    const text = \`CAT PURRE Daily Cat Match \${emoji}\\nOdgadłem w \${attempts.length} próbach!\\nStreak: \${streak} dni 🔥\\n\\nhttps://catpurre.pl/daily-cat\`;
    
    if (navigator.share) {
      navigator.share({ title: 'Cat Match', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Skopiowano do schowka!');
    }
  };

  if (!todaysCat) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Daily Cat Match - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="daily-cat-page">
        <div className="container">
          <div className="header">
            <h1>🎯 Daily Cat Match</h1>
            <p>Odgadnij dzisiejszą rasę kota!</p>
            
            <div className="stats">
              <div className="stat">
                <span className="number">{streak}</span>
                <span className="label">🔥 Streak</span>
              </div>
              <div className="stat">
                <span className="number">{attempts.length}/6</span>
                <span className="label">Próby</span>
              </div>
            </div>
          </div>

          {!won ? (
            <div className="game-area">
              <div className="mystery-cat">
                <div className="cat-silhouette">
                  🐱❓
                </div>
              </div>

              <div className="hints">
                <h3>💡 Wskazówki:</h3>
                <div className="hints-grid">
                  {[1, 2, 3].map(num => (
                    <button
                      key={num}
                      className={\`hint-btn \${hints[\`hint\${num}\`] ? 'revealed' : ''}\`}
                      onClick={() => revealHint(num)}
                      disabled={hints[\`hint\${num}\`]}
                    >
                      {hints[\`hint\${num}\`] 
                        ? todaysCat.clues[num - 1] 
                        : \`Wskazówka \${num}\`
                      }
                    </button>
                  ))}
                </div>
              </div>

              <div className="attempts-list">
                {attempts.map((attempt, idx) => (
                  <div key={idx} className="attempt-item wrong">
                    ❌ {attempt}
                  </div>
                ))}
              </div>

              <div className="guess-input">
                <input
                  type="text"
                  placeholder="Wpisz rasę kota..."
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && makeGuess()}
                  disabled={attempts.length >= 6}
                />
                <button 
                  onClick={makeGuess}
                  className="btn btn-primary"
                  disabled={attempts.length >= 6}
                >
                  Zgadnij
                </button>
              </div>

              {attempts.length >= 6 && (
                <div className="game-over">
                  <h2>😿 Nie udało się!</h2>
                  <p>Odpowiedź: <strong>{todaysCat.breed}</strong></p>
                  <button className="btn btn-outline" onClick={() => window.location.reload()}>
                    Spróbuj jutro
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="win-screen">
              <div className="confetti">🎉🎊✨</div>
              <h2>Gratulacje!</h2>
              <p>Odgadłeś w <strong>{attempts.length}</strong> próbach!</p>
              <p className="answer">Odpowiedź: <strong>{todaysCat.breed}</strong></p>
              
              <div className="streak-badge">
                <span className="streak-emoji">🔥</span>
                <span className="streak-number">{streak}</span>
                <span className="streak-label">dni z rzędu!</span>
              </div>

              <button className="btn btn-primary btn-lg" onClick={shareResult}>
                📤 Podziel się wynikiem
              </button>

              <p className="next-game">Następna gra za: <strong>12:34:56</strong></p>
            </div>
          )}

          <div className="how-to-play">
            <h3>Jak grać?</h3>
            <ul>
              <li>🎯 Odgadnij dzisiejszą rasę kota</li>
              <li>💡 Masz 6 prób i 3 wskazówki</li>
              <li>🔥 Graj codziennie i buduj streak</li>
              <li>📤 Podziel się wynikiem ze znajomymi!</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .daily-cat-page {
          min-height: 100vh;
          padding: 40px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .header {
          text-align: center;
          color: white;
          margin-bottom: 40px;
        }
        .header h1 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 30px;
        }
        .stat {
          text-align: center;
        }
        .stat .number {
          display: block;
          font-size: 36px;
          font-weight: bold;
        }
        .stat .label {
          font-size: 14px;
          opacity: 0.9;
        }
        .game-area {
          background: white;
          border-radius: 30px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .mystery-cat {
          text-align: center;
          margin-bottom: 40px;
        }
        .cat-silhouette {
          font-size: 120px;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .hints h3 {
          margin-bottom: 16px;
        }
        .hints-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 30px;
        }
        .hint-btn {
          padding: 16px;
          border: 2px solid var(--gray-300);
          background: white;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .hint-btn:hover:not(:disabled) {
          border-color: var(--primary);
          background: #FFF5F8;
        }
        .hint-btn.revealed {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        .hint-btn:disabled {
          cursor: not-allowed;
        }
        .attempts-list {
          margin-bottom: 20px;
        }
        .attempt-item {
          padding: 12px;
          margin-bottom: 8px;
          border-radius: 12px;
          font-weight: 600;
        }
        .attempt-item.wrong {
          background: #FFE5E5;
          color: #FF3B30;
        }
        .guess-input {
          display: flex;
          gap: 12px;
        }
        .guess-input input {
          flex: 1;
        }
        .game-over {
          text-align: center;
          margin-top: 30px;
          padding: 30px;
          background: #FFF1F0;
          border-radius: 20px;
        }
        .win-screen {
          background: white;
          border-radius: 30px;
          padding: 60px 40px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .confetti {
          font-size: 80px;
          margin-bottom: 20px;
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .win-screen h2 {
          font-size: 36px;
          margin-bottom: 16px;
        }
        .answer {
          font-size: 24px;
          margin: 20px 0;
        }
        .streak-badge {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(135deg, #FF6B9D, #FFA07A);
          padding: 30px 50px;
          border-radius: 20px;
          color: white;
          margin: 30px 0;
        }
        .streak-emoji {
          font-size: 48px;
        }
        .streak-number {
          font-size: 64px;
          font-weight: bold;
        }
        .streak-label {
          font-size: 18px;
        }
        .next-game {
          margin-top: 20px;
          color: var(--gray-600);
        }
        .how-to-play {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 20px;
          color: white;
          margin-top: 40px;
        }
        .how-to-play ul {
          list-style: none;
          padding: 0;
        }
        .how-to-play li {
          padding: 12px 0;
          font-size: 16px;
        }
      `}</style>
    </>
  );
}
