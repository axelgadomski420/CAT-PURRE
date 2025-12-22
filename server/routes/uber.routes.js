const express = require('express');
const router = express.Router();

// Uber API integration
router.post('/book', async (req, res) => {
  try {
    const { pickupAddress, dropoffAddress, catName, userId } = req.body;

    // Call Uber API
    // const uberResponse = await fetch('https://api.uber.com/v1.2/requests', {...});

    // Mock response
    const booking = {
      rideId: 'ride_' + Math.random().toString(36).substr(2, 9),
      status: 'processing',
      driver: {
        name: 'Jan Kowalski',
        rating: 4.9,
        vehicle: 'Toyota Corolla',
        plate: 'WA 12345'
      },
      eta: '5-8 min',
      trackingUrl: \`https://uber.com/track/\${Math.random().toString(36)}\`
    };

    res.json({ success: true, booking });

  } catch (error) {
    console.error('Uber booking error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/track/:rideId', async (req, res) => {
  try {
    // Get ride status from Uber API
    const status = {
      status: 'on_the_way',
      driverLocation: { lat: 52.2297, lng: 21.0122 },
      eta: '3 min'
    };

    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
