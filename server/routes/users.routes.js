const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => res.json({ success: true, user: {} }));
router.put('/profile', (req, res) => res.json({ success: true }));

module.exports = router;
