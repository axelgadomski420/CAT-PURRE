const express = require('express');
const router = express.Router();

router.post('/generate', (req, res) => res.json({ success: true }));
router.post('/sign', (req, res) => res.json({ success: true }));

module.exports = router;
