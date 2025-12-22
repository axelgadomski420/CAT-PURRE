const express = require('express');
const router = express.Router();

router.post('/compatibility', async (req, res) => {
  try {
    const { cat1Id, cat2Id } = req.body;
    
    const result = {
      compatibilityScore: 85,
      inbreedingRisk: 'low',
      expectedColors: ['blue', 'seal point'],
      healthRisks: [],
      breedingValue: 92,
      recommendations: ['Doskonała para', 'Niskie ryzyko genetyczne']
    };
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
