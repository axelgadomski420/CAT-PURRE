import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import { useAuth } from '../context/AuthContext';

export default function InsurancePage() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [catInfo, setCatInfo] = useState({
    name: '',
    age: '',
    breed: '',
    healthConditions: []
  });

  const plans = [
    {
      id: 'basic',
      name: 'Pakiet Podstawowy',
      price: 49,
      emoji: '🛡️',
      features: [
        'Wizyty u weterynarza (do 2000 PLN/rok)',
        'Szczepienia podstawowe',
        'Profilaktyka zdrowotna',
        'Konsultacje telefoniczne 24/7',
        'Udział własny: 20%'
      ],
      color: '#667eea'
    },
    {
      id: 'standard',
      name: 'Pakiet Standard',
      price: 89,
      emoji: '⭐',
      popular: true,
      features: [
        'Wizyty u weterynarza (do 5000 PLN/rok)',
        'Szczepienia + odrobaczanie',
        'Chirurgia i hospitalizacja',
        'Badania diagnostyczne (USG, RTG)',
        'Leki i terapie',
        'Emergency 24/7',
        'Udział własny: 10%'
      ],
      color: '#FF6B9D'
    },
    {
      id: 'premium',
      name: 'Pakiet Premium',
      price: 149,
      emoji: '👑',
      features: [
        'Wizyty u weterynarza (nielimitowane)',
        'Pełna opieka medyczna',
        'Chirurgia specjalistyczna',
        'Rehabilitacja i fizjoterapia',
        'Terapie alternatywne',
        'Stomatologia',
        'Transport medyczny',
        'Emergency 24/7 z wizytą domową',
        'Ubezpieczenie OC',
        'Udział własny: 0%',
        'Bonus: Voucher 200 PLN na akcesoria'
      ],
      color: '#FFD700'
    }
  ];

  const calculatePrice = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    let price = plan.price;

    // Age multiplier
    if (catInfo.age < 1) price *= 0.9; // Młode koty taniej
    else if (catInfo.age > 7) price *= 1.3; // Starsze drożej
    
    // Health conditions
    if (catInfo.healthConditions.length > 0) {
      price *= (1 + catInfo.healthConditions.length * 0.15);
    }

    return Math.round(price);
  };

  return (
    <>
      <Head>
        <title>Ubezpieczenie kota - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="insurance-page">
        <div className="container">
          <div className="hero-section">
            <h1>🛡️ Ubezpieczenie dla Twojego kota</h1>
            <p className="subtitle">Spokój i bezpieczeństwo w każdej sytuacji</p>
            <div className="stats-banner">
              <div className="stat">
                <strong>15,000+</strong>
                <span>Ubezpieczonych kotów</span>
              </div>
              <div className="stat">
                <strong>98%</strong>
                <span>Zadowolonych klientów</span>
              </div>
              <div className="stat">
                <strong>24/7</strong>
                <span>Wsparcie emergency</span>
              </div>
            </div>
          </div>

          <div className="plans-section">
            <h2>Wybierz plan ubezpieczenia</h2>
            <div className="plans-grid">
              {plans.map(plan => (
                <div 
                  key={plan.id}
                  className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && <div className="popular-badge">Najpopularniejszy</div>}
                  
                  <div className="plan-header" style={{ background: plan.color }}>
                    <span className="plan-emoji">{plan.emoji}</span>
                    <h3>{plan.name}</h3>
                    <div className="plan-price">
                      <span className="price">{plan.price}</span>
                      <span className="currency">PLN/miesiąc</span>
                    </div>
                  </div>

                  <ul className="plan-features">
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="btn btn-primary">
                    Wybierz plan
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="calculator-section">
            <h2>💰 Kalkulator składki</h2>
            <div className="calculator">
              <div className="form-group">
                <label>Imię kota</label>
                <input
                  type="text"
                  value={catInfo.name}
                  onChange={(e) => setCatInfo({...catInfo, name: e.target.value})}
                  placeholder="Luna"
                />
              </div>

              <div className="form-group">
                <label>Wiek (lata)</label>
                <input
                  type="number"
                  value={catInfo.age}
                  onChange={(e) => setCatInfo({...catInfo, age: e.target.value})}
                  placeholder="3"
                />
              </div>

              <div className="form-group">
                <label>Rasa</label>
                <select 
                  value={catInfo.breed}
                  onChange={(e) => setCatInfo({...catInfo, breed: e.target.value})}
                >
                  <option value="">Wybierz rasę</option>
                  <option value="mixed">Mieszaniec</option>
                  <option value="british">British Shorthair</option>
                  <option value="maine">Maine Coon</option>
                  <option value="persian">Kot Perski</option>
                </select>
              </div>

              {catInfo.age && (
                <div className="price-result">
                  <h3>Twoja miesięczna składka:</h3>
                  <div className="calculated-price">
                    {calculatePrice()} PLN/miesiąc
                  </div>
                  <button className="btn btn-primary btn-lg">
                    Wykup ubezpieczenie
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="benefits-section">
            <h2>✨ Dlaczego warto?</h2>
            <div className="benefits-grid">
              <div className="benefit">
                <span className="icon">💊</span>
                <h4>Koszty leczenia</h4>
                <p>Średni koszt leczenia kota: 3000-8000 PLN rocznie</p>
              </div>
              <div className="benefit">
                <span className="icon">🚨</span>
                <h4>Nagłe wypadki</h4>
                <p>Chirurgia ratująca życie może kosztować 5000-15000 PLN</p>
              </div>
              <div className="benefit">
                <span className="icon">😌</span>
                <h4>Spokój ducha</h4>
                <p>Nie martw się o koszty, skup się na zdrowiu kota</p>
              </div>
              <div className="benefit">
                <span className="icon">🏥</span>
                <h4>Najlepsi weterynarze</h4>
                <p>Dostęp do sieci 500+ zaufanych weterynarzy</p>
              </div>
            </div>
          </div>

          <div className="partner-banner">
            <h3>🤝 Partner: PetExpert by Trupanion</h3>
            <p>Lider ubezpieczeń zwierząt w Europie</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .insurance-page {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .hero-section {
          text-align: center;
          margin-bottom: 60px;
        }
        .hero-section h1 {
          font-size: 56px;
          margin-bottom: 16px;
        }
        .subtitle {
          font-size: 24px;
          color: var(--gray-600);
          margin-bottom: 40px;
        }
        .stats-banner {
          display: flex;
          justify-content: center;
          gap: 60px;
          padding: 30px;
          background: white;
          border-radius: 30px;
          box-shadow: var(--shadow-md);
          max-width: 900px;
          margin: 0 auto;
        }
        .stat {
          text-align: center;
        }
        .stat strong {
          display: block;
          font-size: 36px;
          color: var(--primary);
          margin-bottom: 8px;
        }
        .plans-section {
          margin-bottom: 80px;
        }
        .plans-section h2 {
          text-align: center;
          font-size: 40px;
          margin-bottom: 40px;
        }
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .plan-card {
          background: white;
          border-radius: 30px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: var(--shadow-md);
          position: relative;
        }
        .plan-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }
        .plan-card.selected {
          border: 4px solid #FFD700;
        }
        .plan-card.popular {
          border: 3px solid var(--primary);
        }
        .popular-badge {
          position: absolute;
          top: 20px;
          right: -35px;
          background: var(--primary);
          color: white;
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
        .plan-header h3 {
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
        }
        .plan-features {
          list-style: none;
          padding: 30px;
          margin: 0;
        }
        .plan-features li {
          display: flex;
          align-items: start;
          gap: 12px;
          padding: 12px 0;
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
        .plan-card .btn {
          margin: 0 30px 30px 30px;
          width: calc(100% - 60px);
        }
        .calculator-section {
          background: white;
          padding: 50px;
          border-radius: 30px;
          margin-bottom: 80px;
          box-shadow: var(--shadow-lg);
        }
        .calculator-section h2 {
          text-align: center;
          margin-bottom: 40px;
        }
        .calculator {
          max-width: 600px;
          margin: 0 auto;
        }
        .price-result {
          text-align: center;
          padding: 40px;
          background: var(--gradient-primary);
          color: white;
          border-radius: 20px;
          margin-top: 30px;
        }
        .calculated-price {
          font-size: 56px;
          font-weight: bold;
          margin: 20px 0;
        }
        .benefits-section {
          margin-bottom: 80px;
        }
        .benefits-section h2 {
          text-align: center;
          font-size: 40px;
          margin-bottom: 40px;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .benefit {
          background: white;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          box-shadow: var(--shadow-md);
        }
        .benefit .icon {
          font-size: 56px;
          display: block;
          margin-bottom: 16px;
        }
        .benefit h4 {
          margin: 0 0 12px 0;
        }
        .benefit p {
          margin: 0;
          color: var(--gray-600);
          font-size: 14px;
        }
        .partner-banner {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 40px;
          border-radius: 30px;
          text-align: center;
        }
        .partner-banner h3 {
          margin: 0 0 12px 0;
          font-size: 32px;
        }
        @media (max-width: 768px) {
          .plans-grid,
          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
