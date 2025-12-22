const express = require('express');
const router = express.Router();
router.post('/order', async (req, res) => {
  res.json({ success: true, testId: Date.now() });
});
module.exports = router;
