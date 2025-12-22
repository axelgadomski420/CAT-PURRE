const express = require('express');
const router = express.Router();
router.get('/stats', async (req, res) => {
  res.json({
    totalUsers: 1247,
    totalBreeders: 156,
    totalCats: 523,
    totalRevenue: 145000
  });
});
module.exports = router;
