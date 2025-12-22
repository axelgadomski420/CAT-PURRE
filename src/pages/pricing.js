import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import SubscriptionService from '../services/SubscriptionService';

export default function PricingPage() {
  const [plans, setPlans] = useState([]);
  const [interval, setInterval] = useState('month');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const { plans } = await SubscriptionService.getPlans();
    setPlans(plans);
  };

  const handleSubscribe = async (planId) => {
    setLoading(true);
    try {
      const result = await SubscriptionService.createSubscription(planId);
      window.location.href = result.checkoutUrl;
    } catch (error) {
      alert('Błąd podczas tworzenia subskrypcji');
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      
      <div className="pricing-page">
        <div className="container">
          <div className="pricing-header">
            <h1>💎 Wybierz plan dla swojej hodowli</h1>
            <p>Rozwijaj swoją hodowlę z CAT PURRE. Anuluj w każdej chwili.</p>
            
            <div className="interval-toggle">
              <button 
                className={interval === 'month' ? 'active' : ''}
                onClick={() => setInterval('month')}
              >
                Miesięcznie
              </button>
              <button 
                className={interval === 'year' ? 'active' : ''}
                onClick={() => setInterval('year')}
              >
                Rocznie <span className="badge">-20%</span>
              </button>
            </div>
          </div>

          <div className="plans-grid">
            {plans.map(plan => (
              <div 
                key={plan.id} 
                className={`plan-card ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && (
                  <div className="popular-badge">⭐ Najpopularniejszy</div>
                )}

                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="price">
                    {plan.price === 0 ? (
                      <span className="free">Darmowy</span>
                    ) : (
                      <>
                        <span className="amount">{plan.price}</span>
                        <span className="currency">PLN</span>
                        <span className="interval">/{plan.interval === 'month' ? 'mies' : 'rok'}</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={feature.startsWith('✗') ? 'disabled' : ''}>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSubscribe(plan.id)}
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} btn-lg`}
                  disabled={loading}
                >
                  {plan.price === 0 ? 'Zacznij za darmo' : 'Wybierz plan'}
                </button>

                {plan.id === 'pro' && (
                  <p className="trial-note">✨ 14 dni试用 za darmo</p>
                )}
              </div>
            ))}
          </div>

          <div className="faq-section">
            <h2>❓ Często zadawane pytania</h2>
            
            <div className="faq-grid">
              <div className="faq-item">
                <h4>Czy mogę anulować w każdej chwili?</h4>
                <p>Tak! Możesz anulować subskrypcję w dowolnym momencie bez dodatkowych opłat.</p>
              </div>

              <div className="faq-item">
                <h4>Czy mogę zmienić plan?</h4>
                <p>Oczywiście! Możesz upgradować lub downgrade w każdej chwili.</p>
              </div>

              <div className="faq-item">
                <h4>Jakie metody płatności akceptujecie?</h4>
                <p>Akceptujemy karty kredytowe, BLIK, przelewy bankowe i kryptowaluty.</p>
              </div>

              <div className="faq-item">
                <h4>Czy są ukryte opłaty?</h4>
                <p>Nie! Cena którą widzisz to cena którą płacisz. Zero ukrytych kosztów.</p>
              </div>
            </div>
          </div>

          <div className="enterprise-cta">
            <h2>🏢 Potrzebujesz rozwiązania Enterprise?</h2>
            <p>Skontaktuj się z nami po indywidualną ofertę dla dużych hodowli</p>
            <button className="btn btn-primary btn-lg">Skontaktuj się</button>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .pricing-page {
          min-height: 100vh;
          padding: 80px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .pricing-header {
          text-align: center;
          margin-bottom: 60px;
          color: white;
        }
        .pricing-header h1 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .pricing-header p {
          font-size: 20px;
          opacity: 0.9;
          margin-bottom: 40px;
        }
        .interval-toggle {
          display: inline-flex;
          background: rgba(255,255,255,0.2);
          padding: 6px;
          border-radius: 50px;
          gap: 8px;
        }
        .interval-toggle button {
          padding: 12px 32px;
          border: none;
          background: transparent;
          color: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 600;
        }
        .interval-toggle button.active {
          background: white;
          color: #667eea;
        }
        .badge {
          background: #34C759;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          margin-left: 8px;
        }
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 80px;
        }
        .plan-card {
          background: white;
          border-radius: 24px;
          padding: 40px;
          position: relative;
          transition: transform 0.3s;
        }
        .plan-card:hover {
          transform: translateY(-8px);
        }
        .plan-card.popular {
          border: 3px solid #FF6B9D;
          box-shadow: 0 20px 60px rgba(255,107,157,0.3);
          transform: scale(1.05);
        }
        .popular-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: #FF6B9D;
          color: white;
          padding: 8px 24px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 14px;
        }
        .plan-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 30px;
          border-bottom: 2px solid #f0f0f0;
        }
        .plan-header h3 {
          font-size: 28px;
          margin-bottom: 20px;
        }
        .price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 4px;
        }
        .price .free {
          font-size: 32px;
          font-weight: bold;
          color: #34C759;
        }
        .price .amount {
          font-size: 48px;
          font-weight: bold;
          color: #1a1a1a;
        }
        .price .currency {
          font-size: 20px;
          color: #666;
        }
        .price .interval {
          font-size: 16px;
          color: #999;
        }
        .features {
          list-style: none;
          padding: 0;
          margin: 0 0 30px 0;
        }
        .features li {
          padding: 12px 0;
          font-size: 15px;
          line-height: 1.6;
        }
        .features li.disabled {
          color: #999;
        }
        .trial-note {
          text-align: center;
          margin-top: 16px;
          color: #666;
          font-size: 14px;
        }
        .faq-section {
          background: white;
          padding: 60px;
          border-radius: 24px;
          margin-bottom: 60px;
        }
        .faq-section h2 {
          text-align: center;
          margin-bottom: 40px;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }
        .faq-item h4 {
          margin-bottom: 12px;
          color: #1a1a1a;
        }
        .faq-item p {
          color: #666;
          line-height: 1.6;
        }
        .enterprise-cta {
          background: white;
          padding: 60px;
          border-radius: 24px;
          text-align: center;
        }
        .enterprise-cta h2 {
          margin-bottom: 16px;
        }
        .enterprise-cta p {
          font-size: 18px;
          color: #666;
          margin-bottom: 30px;
        }
        @media (max-width: 768px) {
          .plans-grid {
            grid-template-columns: 1fr;
          }
          .plan-card.popular {
            transform: scale(1);
          }
          .faq-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
