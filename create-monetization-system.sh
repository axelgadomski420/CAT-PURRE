#!/bin/zsh

echo "💰💰💰 COMPLETE MONETIZATION SYSTEM"

# ============================================
# CREDITS SYSTEM - Multi-purpose 100 PLN
# ============================================

cat > server/models/Credits.model.js << 'CREDITSMODELEOF'
const mongoose = require('mongoose');

const creditsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  },
  
  // Breakdown
  earned: {
    referrals: { type: Number, default: 0 },
    promotions: { type: Number, default: 0 },
    rewards: { type: Number, default: 0 }
  },
  
  spent: {
    catPurchase: { type: Number, default: 0 },
    premium: { type: Number, default: 0 },
    adFree: { type: Number, default: 0 },
    featured: { type: Number, default: 0 },
    virtualVisits: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },

  transactions: [{
    type: {
      type: String,
      enum: [
        'earn_referral',
        'earn_promotion', 
        'earn_reward',
        'spend_cat_purchase',
        'spend_premium',
        'spend_ad_free',
        'spend_featured',
        'spend_virtual_visit',
        'refund'
      ]
    },
    amount: Number,
    description: String,
    reference: String, // Order ID, User ID, etc.
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Add credits
creditsSchema.methods.addCredits = async function(amount, type, description, reference) {
  this.balance += amount;
  
  if (type === 'earn_referral') this.earned.referrals += amount;
  else if (type === 'earn_promotion') this.earned.promotions += amount;
  else if (type === 'earn_reward') this.earned.rewards += amount;
  
  this.transactions.push({ type, amount, description, reference });
  await this.save();
  return this;
};

// Spend credits
creditsSchema.methods.spendCredits = async function(amount, type, description, reference) {
  if (this.balance < amount) {
    throw new Error('Insufficient credits');
  }
  
  this.balance -= amount;
  
  if (type === 'spend_cat_purchase') this.spent.catPurchase += amount;
  else if (type === 'spend_premium') this.spent.premium += amount;
  else if (type === 'spend_ad_free') this.spent.adFree += amount;
  else if (type === 'spend_featured') this.spent.featured += amount;
  else if (type === 'spend_virtual_visit') this.spent.virtualVisits += amount;
  
  this.transactions.push({ type, amount: -amount, description, reference });
  await this.save();
  return this;
};

module.exports = mongoose.model('Credits', creditsSchema);
CREDITSMODELEOF

# ============================================
# PREMIUM PERKS SYSTEM
# ============================================

cat > server/models/Subscription.model.js << 'SUBSCRIPTIONMODELEOF'
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    enum: ['free', 'ad_free', 'premium', 'vip'],
    default: 'free'
  },
  features: {
    adFree: { type: Boolean, default: false },
    prioritySupport: { type: Boolean, default: false },
    unlimitedFavorites: { type: Boolean, default: false },
    advancedFilters: { type: Boolean, default: false },
    virtualVisits: { type: Number, default: 0 }, // per month
    featuredListings: { type: Number, default: 0 }, // per month
    earlyAccess: { type: Boolean, default: false },
    badge: String // 'VIP', 'Premium', etc.
  },
  validUntil: Date,
  autoRenew: { type: Boolean, default: false },
  paymentMethod: String
}, {
  timestamps: true
});

// Check if subscription is active
subscriptionSchema.methods.isActive = function() {
  return this.validUntil && this.validUntil > new Date();
};

// Plans pricing
subscriptionSchema.statics.PLANS = {
  FREE: {
    id: 'free',
    name: 'Darmowy',
    price: 0,
    features: {
      adFree: false,
      prioritySupport: false,
      unlimitedFavorites: false,
      advancedFilters: false,
      virtualVisits: 0,
      featuredListings: 0,
      earlyAccess: false
    }
  },
  AD_FREE: {
    id: 'ad_free',
    name: 'Bez Reklam',
    price: 20, // 20 PLN/month
    features: {
      adFree: true,
      prioritySupport: false,
      unlimitedFavorites: false,
      advancedFilters: false,
      virtualVisits: 0,
      featuredListings: 0,
      earlyAccess: false
    }
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 49, // 49 PLN/month
    features: {
      adFree: true,
      prioritySupport: true,
      unlimitedFavorites: true,
      advancedFilters: true,
      virtualVisits: 3,
      featuredListings: 0,
      earlyAccess: true,
      badge: '⭐ Premium'
    }
  },
  VIP: {
    id: 'vip',
    name: 'VIP',
    price: 99, // 99 PLN/month
    features: {
      adFree: true,
      prioritySupport: true,
      unlimitedFavorites: true,
      advancedFilters: true,
      virtualVisits: 10,
      featuredListings: 2,
      earlyAccess: true,
      badge: '👑 VIP'
    }
  }
};

module.exports = mongoose.model('Subscription', subscriptionSchema);
SUBSCRIPTIONMODELEOF

# ============================================
# ADS SYSTEM - For Free Users
# ============================================

cat > src/components/ads/AdBanner.js << 'ADBANNEREOF'
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdBanner({ position = 'top', size = 'leaderboard' }) {
  const { user, subscription } = useAuth();
  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    // Hide ads for premium users
    if (subscription && subscription.features.adFree) {
      setShowAd(false);
    }

    // Load Google AdSense
    if (showAd) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [subscription, showAd]);

  if (!showAd) return null;

  const sizes = {
    leaderboard: { width: 728, height: 90 },
    rectangle: { width: 300, height: 250 },
    skyscraper: { width: 160, height: 600 },
    mobile: { width: 320, height: 50 }
  };

  return (
    <div className="ad-container">
      <span className="ad-label">Reklama</span>
      
      {/* Google AdSense */}
      <ins 
        className="adsbygoogle"
        style={{ 
          display: 'inline-block',
          width: sizes[size].width + 'px',
          height: sizes[size].height + 'px'
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
      ></ins>

      {/* Fallback - affiliate products */}
      <div className="fallback-ad">
        <a href="https://allegro.pl/kategoria/karmy-dla-kotow" target="_blank" rel="noopener">
          <img src="/ads/cat-food-banner.jpg" alt="Karma dla kotów" />
        </a>
      </div>

      <div className="ad-remove">
        <a href="/premium">Usuń reklamy - tylko 20 PLN/miesiąc →</a>
      </div>

      <style jsx>{`
        .ad-container {
          text-align: center;
          padding: 20px;
          background: var(--gray-50);
          border-radius: 12px;
          margin: 20px 0;
          position: relative;
        }
        .ad-label {
          position: absolute;
          top: 5px;
          left: 5px;
          font-size: 10px;
          color: var(--gray-500);
          text-transform: uppercase;
        }
        .fallback-ad {
          display: none;
        }
        .fallback-ad img {
          max-width: 100%;
          border-radius: 8px;
        }
        .ad-remove {
          margin-top: 12px;
        }
        .ad-remove a {
          color: var(--primary);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
        }
        .ad-remove a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
ADBANNEREOF

# ============================================
# PREMIUM PAGE - Subscription plans
# ============================================

cat > src/pages/premium.js << 'PREMIUMEOF'
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
PREMIUMEOF

# ============================================
# UPDATE globals.css - Better styling
# ============================================

cat > src/styles/globals.css << 'GLOBALSCSSEOF'
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary: #FF6B9D;
  --primary-dark: #E5567F;
  --secondary: #667eea;
  --success: #34C759;
  --warning: #FF9500;
  --danger: #FF3B30;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #FF6B9D 0%, #FFA07A 100%);
  --gradient-secondary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-gold: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.3);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--gray-900);
  background: var(--gray-50);
}

a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: var(--primary);
}

/* Buttons */
.btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 107, 157, 0.3);
}

.btn-secondary {
  background: var(--gradient-secondary);
  color: white;
}

.btn-outline {
  background: white;
  border: 2px solid var(--gray-200);
  color: var(--gray-700);
}

.btn-outline:hover {
  border-color: var(--primary);
  background: #FFF5F8;
  color: var(--primary);
}

.btn-lg {
  padding: 16px 32px;
  font-size: 16px;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* Cards */
.card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

/* Inputs */
input, select, textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--gray-200);
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.2s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(255, 107, 157, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--gray-700);
}

/* Grid */
.grid {
  display: grid;
  gap: 24px;
}

.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Utilities */
.text-center { text-align: center; }
.text-primary { color: var(--primary); }
.text-gray { color: var(--gray-600); }

/* Margins */
.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: 8px; }
.mb-2 { margin-bottom: 16px; }
.mb-3 { margin-bottom: 24px; }
.mb-4 { margin-bottom: 32px; }
.mt-0 { margin-top: 0; }
.mt-1 { margin-top: 8px; }
.mt-2 { margin-top: 16px; }
.mt-3 { margin-top: 24px; }
.mt-4 { margin-top: 32px; }

/* Badges */
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.badge-primary {
  background: var(--primary);
  color: white;
}

.badge-success {
  background: var(--success);
  color: white;
}

/* Loading */
.loader {
  border: 4px solid var(--gray-200);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--gray-100);
}

::-webkit-scrollbar-thumb {
  background: var(--gray-400);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}
GLOBALSCSSEOF

echo "✅✅✅ MONETIZATION SYSTEM COMPLETE!"
echo ""
echo "💰 CREDITS SYSTEM:"
echo "   ✓ Multi-purpose 100 PLN kredytów"
echo "   ✓ Można wydać na:"
echo "     - Zakup kota (rabat)"
echo "     - Premium subscription (49 PLN)"
echo "     - Ad-Free (20 PLN/m)"
echo "     - Featured Listings (30 PLN)"
echo "     - Virtual Visits (15 PLN/wizyta)"
echo "     - DNA Test discount (50 PLN)"
echo ""
echo "📱 SUBSCRIPTION PLANS:"
echo "   ✓ FREE - Z reklamami"
echo "   ✓ AD-FREE - 20 PLN/m - bez reklam"
echo "   ✓ PREMIUM - 49 PLN/m - all features ⭐"
echo "   ✓ VIP - 99 PLN/m - ultimate 👑"
echo ""
echo "📢 ADS SYSTEM:"
echo "   ✓ Google AdSense integration"
echo "   ✓ Affiliate banners (Allegro, Zooplus)"
echo "   ✓ Only for FREE users"
echo "   ✓ Easy upgrade prompt"
echo ""
echo "✨ UPDATED:"
echo "   ✓ globals.css - better design system"
echo "   ✓ AdBanner component"
echo "   ✓ Premium page with comparison"
echo "   ✓ Credits multi-use system"
echo ""

