import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import { useAuth } from '../context/AuthContext';

export default function PremiumPage() {
  const { user, credits } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const plans = [
    {
      id: 'ad_free',
      name: 'Bez Reklam',
      price: 20,
      emoji: '🚫',
      features: [
        'Brak reklam',
        'Podstawowe funkcje',
        'Email support'
      ],
      color: '#667eea'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 49,
      emoji: '⭐',
      popular: true,
      features: [
        'Wszystko z Bez Reklam +',
        'Priorytetowe wsparcie 24/7',
        'Nielimitowane ulubione',
        'Zaawansowane filtry',
        '3 wirtualne wizyty/miesiąc',
        'Wczesny dostęp do nowości',
        'Odznaka Premium'
      ],
      color: '#FF6B9D'
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 99,
      emoji: '👑',
      features: [
        'Wszystko z Premium +',
        '10 wirtualnych wizyt/miesiąc',
        '2 wyróżnione ogłoszenia/miesiąc',
        'Dedykowany opiekun',
        'Ekskluzywne wydarzenia',
        'Odznaka VIP',
        'Dożywotni rabat 10%'
      ],
      color: '#FFD700'
    }
  ];

  const handleSubscribe = (plan) => {
    if (credits?.balance >= plan.price) {
      alert(\`Wykup \${plan.name} za \${plan.price} PLN z kredytów?\`);
    } else {
      alert(\`Przekierowanie do płatności: \${plan.price} PLN\`);
    }
  };

  return (
    <>
      <Head>
        <title>Premium - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="premium-page">
        <div className="container">
          <div className="hero">
            <h1>✨ Odblokuj pełny potencjał CAT PURRE</h1>
            <p>Wybierz plan i ciesz się premium doświadczeniem</p>
            
            {credits?.balance > 0 && (
              <div className="credits-banner">
                💰 Masz <strong>{credits.balance} PLN</strong> kredytów!
                Możesz je użyć do opłacenia subskrypcji
              </div>
            )}
          </div>

          <div className="plans-grid">
            {plans.map(plan => (
              <div 
                key={plan.id} 
                className={\`plan-card \${selectedPlan === plan.id ? 'selected' : ''} \${plan.popular ? 'popular' : ''}\`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && <div className="popular-badge">Najpopularniejszy</div>}
                
                <div className="plan-header" style={{ background: plan.color }}>
                  <span className="plan-emoji">{plan.emoji}</span>
                  <h2>{plan.name}</h2>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                    <span className="currency">PLN/miesiąc</span>
                  </div>
                </div>

                <div className="plan-features">
                  <ul>
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => handleSubscribe(plan)}
                >
                  {credits?.balance >= plan.price 
                    ? \`Użyj \${plan.price} PLN kredytów\`
                    : 'Wykup teraz'
                  }
                </button>
              </div>
            ))}
          </div>

          <div className="comparison-section">
            <h2>📊 Porównanie planów</h2>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Funkcja</th>
                  <th>Darmowy</th>
                  <th>Bez Reklam</th>
                  <th>Premium</th>
                  <th>VIP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Przeglądanie kotów</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Reklamy</td>
                  <td>❌ Tak</td>
                  <td>✓ Nie</td>
                  <td>✓ Nie</td>
                  <td>✓ Nie</td>
                </tr>
                <tr>
                  <td>Ulubione</td>
                  <td>10</td>
                  <td>10</td>
                  <td>∞</td>
                  <td>∞</td>
                </tr>
                <tr>
                  <td>Wirtualne wizyty</td>
                  <td>-</td>
                  <td>-</td>
                  <td>3/miesiąc</td>
                  <td>10/miesiąc</td>
                </tr>
                <tr>
                  <td>Wsparcie</td>
                  <td>Email</td>
                  <td>Email</td>
                  <td>24/7 Chat</td>
                  <td>Dedykowany</td>
                </tr>
                <tr>
                  <td>Odznaka</td>
                  <td>-</td>
                  <td>-</td>
                  <td>⭐ Premium</td>
                  <td>👑 VIP</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="faq-section">
            <h2>❓ FAQ</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>Czy mogę użyć kredytów?</h4>
                <p>Tak! Możesz opłacić subskrypcję kredytami zdobytymi z referrals.</p>
              </div>
              <div className="faq-item">
                <h4>Czy mogę anulować?</h4>
                <p>Tak, w każdej chwili. Bez ukrytych opłat.</p>
              </div>
              <div className="faq-item">
                <h4>Czy są zniżki roczne?</h4>
                <p>Tak! Oszczędź 20% przy rocznej subskrypcji.</p>
              </div>
              <div className="faq-item">
                <h4>Jaki plan wybrać?</h4>
                <p>Premium to najlepszy wybór - wszystkie funkcje w dobrej cenie.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .premium-page {
          min-height: 100vh;
          padding: 40px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .hero {
          text-align: center;
          color: white;
          margin-bottom: 60px;
        }
        .hero h1 {
          font-size: 56px;
          margin-bottom: 20px;
        }
        .hero p {
          font-size: 24px;
          opacity: 0.9;
          margin-bottom: 30px;
        }
        .credits-banner {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          padding: 20px 40px;
          border-radius: 30px;
          font-size: 18px;
        }
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 80px;
        }
        .plan-card {
          background: white;
          border-radius: 30px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .plan-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .plan-card.selected {
          border: 4px solid #FFD700;
          transform: scale(1.05);
        }
        .plan-card.popular {
          border: 3px solid #FFD700;
        }
        .popular-badge {
          position: absolute;
          top: 20px;
          right: -35px;
          background: #FFD700;
          color: #000;
          padding: 8px 40px;
          transform: rotate(45deg);
          font-weight: bold;
          font-size: 12px;
          z-index: 10;
        }
        .plan-header {
          padding: 40px 30px;
          color: white;
          text-align: center;
        }
        .plan-emoji {
          font-size: 64px;
          display: block;
          margin-bottom: 16px;
        }
        .plan-header h2 {
          margin: 0 0 20px 0;
          font-size: 28px;
        }
        .plan-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8px;
        }
        .price {
          font-size: 48px;
          font-weight: bold;
        }
        .currency {
          font-size: 16px;
          opacity: 0.9;
        }
        .plan-features {
          padding: 30px;
        }
        .plan-features ul {
          list-style: none;
          padding: 0;
          margin: 0 0 30px 0;
        }
        .plan-features li {
          padding: 12px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid var(--gray-200);
        }
        .plan-features li:last-child {
          border-bottom: none;
        }
        .check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--success);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 14px;
        }
        .comparison-section,
        .faq-section {
          background: white;
          padding: 50px;
          border-radius: 30px;
          margin-bottom: 40px;
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
        }
        .comparison-table th,
        .comparison-table td {
          padding: 16px;
          text-align: center;
          border-bottom: 1px solid var(--gray-200);
        }
        .comparison-table th {
          background: var(--gray-50);
          font-weight: 600;
        }
        .comparison-table td:first-child {
          text-align: left;
          font-weight: 500;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-top: 30px;
        }
        .faq-item {
          padding: 24px;
          background: var(--gray-50);
          border-radius: 16px;
        }
        .faq-item h4 {
          margin: 0 0 12px 0;
        }
        .faq-item p {
          margin: 0;
          color: var(--gray-600);
        }
        @media (max-width: 768px) {
          .plans-grid,
          .faq-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
