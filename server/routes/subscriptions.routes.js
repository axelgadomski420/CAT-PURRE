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
