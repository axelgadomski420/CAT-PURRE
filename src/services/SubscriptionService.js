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
