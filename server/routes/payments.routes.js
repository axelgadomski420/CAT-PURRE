const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/stripe/create', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency.toLowerCase(),
      payment_method_types: ['card']
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/blik/create', async (req, res) => {
  try {
    const { amount, code } = req.body;
    // BLIK integration logic
    res.json({ success: true, paymentId: 'blik_' + Date.now() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
