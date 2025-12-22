#!/bin/zsh

echo "💎 Tworzenie SUBSCRIPTION SYSTEM + reszty..."

# ============================================
# SUBSCRIPTION SERVICE - Dla hodowców
# ============================================

cat > src/services/SubscriptionService.js << 'SUBEOF'
import axios from 'axios';

class SubscriptionService {
  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL;
  }

  // 📋 Dostępne plany
  async getPlans() {
    return {
      plans: [
        {
          id: 'starter',
          name: 'Starter',
          price: 0,
          interval: 'lifetime',
          features: [
            '✓ 3 aktywne ogłoszenia',
            '✓ Podstawowy profil',
            '✓ Chat z klientami',
            '✗ Wyróżnienie w wynikach',
            '✗ AI marketing',
            '✗ Live streaming',
            '✗ Statystyki zaawansowane'
          ],
          limits: {
            activeCats: 3,
            photos: 5,
            videos: 0,
            featured: false,
            aiMarketing: false,
            liveStream: false,
            analytics: 'basic'
          }
        },
        {
          id: 'pro',
          name: 'Professional',
          price: 99,
          interval: 'month',
          popular: true,
          features: [
            '✓ 15 aktywnych ogłoszeń',
            '✓ Rozszerzony profil',
            '✓ Wyróżnienie w wynikach',
            '✓ AI marketing treści',
            '✓ 5 live streamów/miesiąc',
            '✓ Zaawansowane statystyki',
            '✓ Priorytetowe wsparcie',
            '✓ Badge "Professional"'
          ],
          limits: {
            activeCats: 15,
            photos: 20,
            videos: 10,
            featured: true,
            aiMarketing: true,
            liveStream: 5,
            analytics: 'advanced',
            support: 'priority'
          }
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: 299,
          interval: 'month',
          features: [
            '✓ Nielimitowane ogłoszenia',
            '✓ Premium profil',
            '✓ Zawsze na szczycie wyników',
            '✓ Pełne AI marketing',
            '✓ Nielimitowane live streamy',
            '✓ Dedykowany account manager',
            '✓ API access',
            '✓ White-label branding',
            '✓ Custom domain',
            '✓ NFT pedigree mint'
          ],
          limits: {
            activeCats: 999,
            photos: 999,
            videos: 999,
            featured: true,
            aiMarketing: true,
            liveStream: 999,
            analytics: 'enterprise',
            support: 'dedicated',
            api: true,
            whiteLabel: true
          }
        }
      ]
    };
  }

  // 💳 Utwórz subskrypcję
  async createSubscription(planId, paymentMethod = 'stripe') {
    const response = await axios.post(`${this.apiUrl}/api/subscriptions/create`, {
      planId,
      paymentMethod
    });
    return response.data;
  }

  // 📊 Aktywna subskrypcja
  async getCurrentSubscription(userId) {
    const response = await axios.get(`${this.apiUrl}/api/subscriptions/current/${userId}`);
    return response.data;
  }

  // 🔄 Zmień plan
  async changePlan(newPlanId) {
    const response = await axios.post(`${this.apiUrl}/api/subscriptions/change-plan`, {
      newPlanId
    });
    return response.data;
  }

  // ❌ Anuluj subskrypcję
  async cancelSubscription(reason) {
    const response = await axios.post(`${this.apiUrl}/api/subscriptions/cancel`, {
      reason
    });
    return response.data;
  }

  // 💰 Historia płatności
  async getPaymentHistory() {
    const response = await axios.get(`${this.apiUrl}/api/subscriptions/payments`);
    return response.data;
  }

  // 🎁 Kupon rabatowy
  async applyCoupon(couponCode) {
    const response = await axios.post(`${this.apiUrl}/api/subscriptions/coupon`, {
      couponCode
    });
    return response.data;
  }

  // 📈 Upgrade trial
  async startTrial(planId) {
    const response = await axios.post(`${this.apiUrl}/api/subscriptions/trial`, {
      planId,
      trialDays: 14
    });
    return response.data;
  }

  // 🔔 Powiadomienie o wygaśnięciu
  async getExpirationNotice() {
    const response = await axios.get(`${this.apiUrl}/api/subscriptions/expiration`);
    return response.data;
  }

  // 📊 Usage limits
  async getUsageStats(userId) {
    const response = await axios.get(`${this.apiUrl}/api/subscriptions/usage/${userId}`);
    return response.data;
  }

  // ✅ Check feature access
  canAccessFeature(subscription, feature) {
    if (!subscription) return false;
    return subscription.limits[feature] === true || subscription.limits[feature] > 0;
  }

  // 📉 Check quota
  hasQuotaLeft(subscription, resource) {
    if (!subscription || !subscription.usage) return false;
    const limit = subscription.limits[resource];
    const used = subscription.usage[resource] || 0;
    return used < limit;
  }
}

export default new SubscriptionService();
SUBEOF

# ============================================
# SUBSCRIPTION PAGE - Pricing
# ============================================

cat > src/pages/pricing.js << 'PRICINGEOF'
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
PRICINGEOF

# ============================================
# SUBSCRIPTION API ROUTES
# ============================================

cat > server/routes/subscriptions.routes.js << 'SUBROUTESEOF'
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create subscription
router.post('/create', async (req, res) => {
  try {
    const { planId, paymentMethod } = req.body;
    
    // Stripe price IDs
    const priceIds = {
      pro: 'price_pro_monthly',
      enterprise: 'price_enterprise_monthly'
    };
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceIds[planId],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: \`\${process.env.FRONTEND_URL}/dashboard?success=true\`,
      cancel_url: \`\${process.env.FRONTEND_URL}/pricing?canceled=true\`,
    });
    
    res.json({ checkoutUrl: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current subscription
router.get('/current/:userId', async (req, res) => {
  try {
    // Mock response
    res.json({
      subscription: {
        id: 'sub_123',
        plan: 'pro',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        limits: {
          activeCats: 15,
          photos: 20,
          videos: 10
        },
        usage: {
          activeCats: 7,
          photos: 45,
          videos: 3
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel subscription
router.post('/cancel', async (req, res) => {
  try {
    const { reason } = req.body;
    // Cancel logic
    res.json({ success: true, message: 'Subscription cancelled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Usage stats
router.get('/usage/:userId', async (req, res) => {
  try {
    res.json({
      usage: {
        activeCats: 7,
        totalCats: 15,
        photos: 45,
        videos: 3,
        liveStreams: 2
      },
      limits: {
        activeCats: 15,
        photos: 20,
        videos: 10,
        liveStreams: 5
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
SUBROUTESEOF

# ============================================
# MIDDLEWARE - Auth + Role Check
# ============================================

mkdir -p server/middleware

cat > server/middleware/auth.middleware.js << 'AUTHMDEOF'
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Verify JWT token
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user.userType !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Check if user is breeder
exports.isBreeder = (req, res, next) => {
  if (req.user.userType !== 'breeder' && req.user.userType !== 'admin') {
    return res.status(403).json({ error: 'Breeder access required' });
  }
  next();
};

// Check subscription limits
exports.checkSubscriptionLimit = (resource) => {
  return async (req, res, next) => {
    try {
      // Get user's subscription
      const subscription = await getSubscription(req.user._id);
      
      if (!subscription) {
        return res.status(403).json({ error: 'No active subscription' });
      }
      
      // Check limit
      const limit = subscription.limits[resource];
      const usage = subscription.usage[resource] || 0;
      
      if (usage >= limit) {
        return res.status(403).json({ 
          error: \`\${resource} limit exceeded\`,
          limit,
          usage
        });
      }
      
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

// Helper function
async function getSubscription(userId) {
  // Mock - replace with actual DB query
  return {
    limits: { activeCats: 15, photos: 20 },
    usage: { activeCats: 7, photos: 45 }
  };
}
AUTHMDEOF

# ============================================
# CAT DETAIL PAGE
# ============================================

cat > src/pages/cats/[id].js << 'CATDETAILEOF'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import axios from 'axios';

export default function CatDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (id) loadCat();
  }, [id]);

  const loadCat = async () => {
    try {
      const response = await axios.get(\`\${process.env.NEXT_PUBLIC_API_URL}/api/cats/\${id}\`);
      setCat(response.data.cat || mockCat);
    } catch (error) {
      setCat(mockCat);
    }
    setLoading(false);
  };

  const mockCat = {
    id: 1,
    name: 'Luna',
    breed: 'British Shorthair',
    gender: 'female',
    birthDate: '2024-09-15',
    price: 4500,
    color: 'blue',
    description: 'Piękna kotka British Shorthair w kolorze blue. Zdrowa, zaszczepiona, z pełnym rodowodem FIFe. Bardzo spokojna i łagodna, idealna dla rodzin.',
    images: ['/cat1.jpg', '/cat1-2.jpg', '/cat1-3.jpg'],
    videos: ['/cat1-video.mp4'],
    status: 'available',
    breeder: {
      id: 1,
      name: 'Golden British',
      verified: true,
      rating: 4.9,
      reviews: 45,
      city: 'Warszawa',
      avatar: '/breeder1.jpg'
    },
    pedigree: {
      number: 'FIFe/BS/2024/001',
      organization: 'FIFe',
      father: 'Champion Golden King',
      mother: 'Princess Luna Blue'
    },
    health: {
      vaccinations: [
        { name: 'Tricat', date: '2024-11-01' }
      ],
      tests: [
        { name: 'HCM', result: 'negative' },
        { name: 'PKD', result: 'negative' }
      ],
      microchip: '616093900123456'
    },
    location: {
      city: 'Warszawa',
      voivodeship: 'mazowieckie'
    },
    views: 234,
    likes: 12
  };

  if (loading) return <div>Ładowanie...</div>;
  if (!cat) return <div>Kot nie znaleziony</div>;

  const age = Math.floor((new Date() - new Date(cat.birthDate)) / (1000 * 60 * 60 * 24 * 30));

  return (
    <>
      <Navbar />
      
      <div className="cat-detail-page">
        <div className="container">
          <div className="detail-grid">
            {/* Gallery */}
            <div className="gallery">
              <div className="main-image">
                <img src={cat.images[currentImage] || '/placeholder.jpg'} alt={cat.name} />
                {cat.status === 'reserved' && (
                  <div className="status-overlay">Zarezerwowany</div>
                )}
              </div>
              
              <div className="thumbnails">
                {cat.images.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`thumbnail ${idx === currentImage ? 'active' : ''}`}
                    onClick={() => setCurrentImage(idx)}
                  >
                    <img src={img} alt={\`\${cat.name} \${idx + 1}\`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="cat-info">
              <div className="cat-header">
                <div>
                  <h1>{cat.name}</h1>
                  <p className="breed">{cat.breed}</p>
                </div>
                <button className="favorite-btn">❤️ Ulubione</button>
              </div>

              <div className="price-box">
                <div className="price">{cat.price.toLocaleString()} PLN</div>
                <div className="price-note">Cena z rodowodem FIFe</div>
              </div>

              <div className="quick-stats">
                <div className="stat">
                  <span className="label">Wiek</span>
                  <span className="value">{age} mies</span>
                </div>
                <div className="stat">
                  <span className="label">Płeć</span>
                  <span className="value">{cat.gender === 'male' ? '♂️ Samiec' : '♀️ Samica'}</span>
                </div>
                <div className="stat">
                  <span className="label">Kolor</span>
                  <span className="value">{cat.color}</span>
                </div>
                <div className="stat">
                  <span className="label">Lokalizacja</span>
                  <span className="value">{cat.location.city}</span>
                </div>
              </div>

              <div className="actions">
                <button className="btn btn-primary btn-lg">
                  💬 Zapytaj o kota
                </button>
                <button className="btn btn-outline btn-lg">
                  📹 Wirtualna wizyta
                </button>
                <button className="btn btn-outline btn-lg">
                  🔒 Zarezerwuj
                </button>
              </div>

              {/* Breeder */}
              <div className="breeder-card">
                <div className="breeder-header">
                  <div className="breeder-avatar">🏠</div>
                  <div>
                    <h4>{cat.breeder.name}</h4>
                    <div className="breeder-meta">
                      {cat.breeder.verified && <span className="verified">✓ Zweryfikowany</span>}
                      <span>⭐ {cat.breeder.rating}</span>
                      <span>({cat.breeder.reviews} opinii)</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline">Zobacz profil</button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="sections">
            <section className="section">
              <h2>📝 Opis</h2>
              <p>{cat.description}</p>
            </section>

            <section className="section">
              <h2>🏆 Rodowód</h2>
              <div className="pedigree-info">
                <div className="info-row">
                  <span>Numer rodowodu:</span>
                  <strong>{cat.pedigree.number}</strong>
                </div>
                <div className="info-row">
                  <span>Organizacja:</span>
                  <strong>{cat.pedigree.organization}</strong>
                </div>
                <div className="info-row">
                  <span>Ojciec:</span>
                  <strong>{cat.pedigree.father}</strong>
                </div>
                <div className="info-row">
                  <span>Matka:</span>
                  <strong>{cat.pedigree.mother}</strong>
                </div>
              </div>
            </section>

            <section className="section">
              <h2>🏥 Zdrowie</h2>
              <h4>Szczepienia:</h4>
              <ul>
                {cat.health.vaccinations.map((vac, idx) => (
                  <li key={idx}>{vac.name} - {vac.date}</li>
                ))}
              </ul>
              <h4>Testy genetyczne:</h4>
              <ul>
                {cat.health.tests.map((test, idx) => (
                  <li key={idx}>{test.name}: {test.result}</li>
                ))}
              </ul>
              <p>Microchip: {cat.health.microchip}</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .cat-detail-page {
          min-height: 100vh;
          padding: 40px 0;
          background: #f9fafb;
        }
        .detail-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        .gallery {
          background: white;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .main-image {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .main-image img {
          width: 100%;
          height: 600px;
          object-fit: cover;
        }
        .status-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
          font-weight: bold;
        }
        .thumbnails {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .thumbnail {
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        .thumbnail.active {
          opacity: 1;
          border: 3px solid #FF6B9D;
        }
        .thumbnail img {
          width: 100%;
          height: 100px;
          object-fit: cover;
        }
        .cat-info {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .cat-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .cat-header h1 {
          margin: 0 0 8px 0;
          font-size: 36px;
        }
        .breed {
          color: #666;
          font-size: 18px;
          margin: 0;
        }
        .favorite-btn {
          padding: 12px 24px;
          border: 2px solid #FF6B9D;
          background: white;
          color: #FF6B9D;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
        }
        .price-box {
          background: #f9f9f9;
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 24px;
        }
        .price {
          font-size: 42px;
          font-weight: bold;
          color: #FF6B9D;
          margin-bottom: 8px;
        }
        .price-note {
          color: #666;
          font-size: 14px;
        }
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat {
          display: flex;
          flex-direction: column;
        }
        .stat .label {
          font-size: 13px;
          color: #999;
          margin-bottom: 4px;
        }
        .stat .value {
          font-size: 16px;
          font-weight: 600;
        }
        .actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
        }
        .breeder-card {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 16px;
        }
        .breeder-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }
        .breeder-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
        }
        .breeder-meta {
          display: flex;
          gap: 12px;
          font-size: 14px;
          color: #666;
          margin-top: 4px;
        }
        .verified {
          color: #34C759;
          font-weight: 600;
        }
        .sections {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .section {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .section h2 {
          margin: 0 0 20px 0;
        }
        .pedigree-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          background: #f9f9f9;
          border-radius: 8px;
        }
        @media (max-width: 768px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
CATDETAILEOF

echo "✅ SUBSCRIPTION + PAGES + MIDDLEWARE UTWORZONE!"
echo ""
echo "📋 Dodane:"
echo "   ✓ Subscription Service (3 plany)"
echo "   ✓ Pricing Page"
echo "   ✓ Subscription API Routes"
echo "   ✓ Auth Middleware + Role Check"
echo "   ✓ Cat Detail Page"
echo ""

