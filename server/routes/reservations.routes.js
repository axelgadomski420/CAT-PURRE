const express = require('express');
const router = express.Router();
router.post('/create', async (req, res) => {
  res.json({ success: true, reservationId: Date.now() });
});
module.exports = router;
