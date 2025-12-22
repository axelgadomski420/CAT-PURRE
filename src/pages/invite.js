import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import { useAuth } from '../context/AuthContext';

export default function InvitePage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  const referralCode = user?.id ? \`CAT\${user.id.substring(0, 6).toUpperCase()}\` : 'CATPURRE';
  const referralLink = \`https://catpurre.pl/register?ref=\${referralCode}\`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareVia = (platform) => {
    const text = encodeURIComponent(\`🐱 Dołącz do CAT PURRE i otrzymaj 100 PLN rabatu! Użyj kodu: \${referralCode}\`);
    const url = encodeURIComponent(referralLink);
    
    const urls = {
      facebook: \`https://www.facebook.com/sharer/sharer.php?u=\${url}\`,
      twitter: \`https://twitter.com/intent/tweet?text=\${text}&url=\${url}\`,
      whatsapp: \`https://wa.me/?text=\${text}%20\${url}\`,
      messenger: \`fb-messenger://share/?link=\${url}\`
    };
    
    window.open(urls[platform], '_blank');
  };

  return (
    <>
      <Head>
        <title>Zaproś znajomych - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="invite-page">
        <div className="container">
          <div className="invite-hero">
            <h1>🎁 Zaproś znajomych,<br />zgarniaj nagrody!</h1>
            <p className="subtitle">Za każdego zaproszonego znajomego dostaniecie po 100 PLN!</p>
          </div>

          <div className="rewards-grid">
            <div className="reward-card">
              <span className="reward-icon">💰</span>
              <h3>100 PLN</h3>
              <p>Ty dostajesz</p>
            </div>
            <div className="plus">+</div>
            <div className="reward-card">
              <span className="reward-icon">🎁</span>
              <h3>100 PLN</h3>
              <p>Znajomy dostaje</p>
            </div>
          </div>

          <div className="referral-box">
            <h2>Twój kod polecający:</h2>
            <div className="code-display">
              <span className="code">{referralCode}</span>
              <button className="btn btn-primary" onClick={copyLink}>
                {copied ? '✓ Skopiowano!' : '📋 Kopiuj link'}
              </button>
            </div>

            <div className="link-display">
              <input type="text" value={referralLink} readOnly />
            </div>
          </div>

          <div className="share-section">
            <h3>Udostępnij przez:</h3>
            <div className="share-buttons">
              <button className="share-btn facebook" onClick={() => shareVia('facebook')}>
                <span>f</span> Facebook
              </button>
              <button className="share-btn twitter" onClick={() => shareVia('twitter')}>
                <span>𝕏</span> Twitter
              </button>
              <button className="share-btn whatsapp" onClick={() => shareVia('whatsapp')}>
                <span>💬</span> WhatsApp
              </button>
              <button className="share-btn messenger" onClick={() => shareVia('messenger')}>
                <span>💬</span> Messenger
              </button>
            </div>
          </div>

          <div className="stats-section">
            <h2>📊 Twoje statystyki</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>12</h3>
                <p>Zaproszonych</p>
              </div>
              <div className="stat-card">
                <h3>8</h3>
                <p>Aktywnych</p>
              </div>
              <div className="stat-card">
                <h3>800 PLN</h3>
                <p>Zarobione</p>
              </div>
            </div>
          </div>

          <div className="leaderboard">
            <h2>🏆 Top Polecacze</h2>
            <div className="leaderboard-list">
              <div className="leaderboard-item gold">
                <span className="rank">🥇</span>
                <span className="name">Jan K.</span>
                <span className="invites">234 zaproszeń</span>
              </div>
              <div className="leaderboard-item silver">
                <span className="rank">🥈</span>
                <span className="name">Anna M.</span>
                <span className="invites">189 zaproszeń</span>
              </div>
              <div className="leaderboard-item bronze">
                <span className="rank">🥉</span>
                <span className="name">Piotr W.</span>
                <span className="invites">156 zaproszeń</span>
              </div>
            </div>
          </div>

          <div className="how-it-works">
            <h2>❓ Jak to działa?</h2>
            <div className="steps">
              <div className="step">
                <span className="step-num">1</span>
                <h4>Udostępnij link</h4>
                <p>Wyślij swój unikalny link znajomym</p>
              </div>
              <div className="step">
                <span className="step-num">2</span>
                <h4>Znajomy się rejestruje</h4>
                <p>I używa Twojego kodu przy rejestracji</p>
              </div>
              <div className="step">
                <span className="step-num">3</span>
                <h4>Oboje dostacie 100 PLN</h4>
                <p>Bonus od razu na Waszych kontach!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .invite-page {
          min-height: 100vh;
          padding: 40px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .invite-hero {
          text-align: center;
          color: white;
          margin-bottom: 50px;
        }
        .invite-hero h1 {
          font-size: 56px;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        .subtitle {
          font-size: 24px;
          opacity: 0.9;
        }
        .rewards-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          margin-bottom: 50px;
        }
        .reward-card {
          background: white;
          padding: 40px 50px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .reward-icon {
          font-size: 64px;
          display: block;
          margin-bottom: 16px;
        }
        .reward-card h3 {
          font-size: 42px;
          color: var(--primary);
          margin-bottom: 8px;
        }
        .plus {
          font-size: 48px;
          color: white;
          font-weight: bold;
        }
        .referral-box {
          background: white;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 40px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .referral-box h2 {
          text-align: center;
          margin-bottom: 24px;
        }
        .code-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        .code {
          font-size: 48px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          color: var(--primary);
          letter-spacing: 4px;
        }
        .link-display input {
          width: 100%;
          padding: 16px;
          text-align: center;
          font-size: 16px;
          background: var(--gray-50);
          border: 2px solid var(--gray-200);
          border-radius: 12px;
        }
        .share-section {
          background: white;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 40px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .share-section h3 {
          text-align: center;
          margin-bottom: 24px;
        }
        .share-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .share-btn {
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .share-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
        .share-btn span {
          font-size: 20px;
        }
        .share-btn.facebook {
          background: #1877F2;
          color: white;
        }
        .share-btn.twitter {
          background: #000;
          color: white;
        }
        .share-btn.whatsapp {
          background: #25D366;
          color: white;
        }
        .share-btn.messenger {
          background: #0084FF;
          color: white;
        }
        .stats-section,
        .leaderboard {
          background: white;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 40px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .stat-card {
          background: var(--gray-50);
          padding: 30px;
          border-radius: 16px;
          text-align: center;
        }
        .stat-card h3 {
          font-size: 36px;
          color: var(--primary);
          margin-bottom: 8px;
        }
        .leaderboard-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .leaderboard-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          border-radius: 16px;
          font-weight: 600;
        }
        .leaderboard-item.gold {
          background: linear-gradient(135deg, #FFD700, #FFA500);
        }
        .leaderboard-item.silver {
          background: linear-gradient(135deg, #C0C0C0, #A8A8A8);
        }
        .leaderboard-item.bronze {
          background: linear-gradient(135deg, #CD7F32, #B87333);
        }
        .leaderboard-item .rank {
          font-size: 32px;
        }
        .leaderboard-item .name {
          flex: 1;
          font-size: 20px;
        }
        .how-it-works {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 20px;
          color: white;
        }
        .how-it-works h2 {
          text-align: center;
          margin-bottom: 40px;
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .step {
          text-align: center;
        }
        .step-num {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: white;
          color: var(--primary);
          font-size: 28px;
          font-weight: bold;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .step h4 {
          margin-bottom: 8px;
        }
        @media (max-width: 768px) {
          .rewards-grid,
          .share-buttons,
          .stats-grid,
          .steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
