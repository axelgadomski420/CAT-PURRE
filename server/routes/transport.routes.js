const express = require('express');
const router = express.Router();
router.post('/book', async (req, res) => {
  res.json({ success: true, bookingId: Date.now() });
});
module.exports = router;
