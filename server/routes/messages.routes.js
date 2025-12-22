const express = require('express');
const router = express.Router();
router.post('/send', async (req, res) => {
  res.json({ success: true, messageId: Date.now() });
});
module.exports = router;
