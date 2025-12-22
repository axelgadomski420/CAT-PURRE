const express = require('express');
const router = express.Router();

router.get('/active', async (req, res) => {
  try {
    // Mock auctions
    const auctions = [
      {
        id: 1,
        catId: '123',
        currentBid: 5000,
        startingPrice: 3000,
        endTime: new Date(Date.now() + 3600000),
        bidCount: 12
      }
    ];
    res.json({ auctions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/bid', async (req, res) => {
  try {
    const { auctionId, amount } = req.body;
    // Bid logic
    res.json({ success: true, newBid: amount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
