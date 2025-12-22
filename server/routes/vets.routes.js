const express = require('express');
const router = express.Router();

// Find nearby vets using Google Places API
router.post('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius, filters } = req.body;

    // Call Google Places API
    // const placesUrl = \`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=\${lat},\${lng}&radius=\${radius*1000}&type=veterinary_care&key=\${process.env.GOOGLE_MAPS_API_KEY}\`;

    // Mock response
    const vets = [
      {
        id: 1,
        name: 'Weterynaria Cat Care',
        address: 'ul. Marszałkowska 123, Warszawa',
        location: { lat: 52.2297, lng: 21.0122 },
        distance: 1.2,
        rating: 4.8,
        reviews: 234,
        phone: '+48 22 123 4567',
        emergency: true,
        catSpecialist: true,
        services: ['Konsultacje', 'Szczepienia', 'Chirugia', 'Stomatologia'],
        openNow: true,
        hours: 'Pon-Pt 8:00-20:00'
      }
    ];

    res.json({ vets });

  } catch (error) {
    console.error('Vets search error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
