const express = require('express');
const router = express.Router();
const Breeder = require('../models/Breeder.model');

router.get('/', async (req, res) => {
  try {
    const breeders = await Breeder.find({ verified: true })
      .populate('user')
      .sort({ rating: -1 });
    res.json({ breeders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const breeder = await Breeder.findById(req.params.id).populate('user');
    res.json({ breeder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const breeder = new Breeder(req.body);
    await breeder.save();
    res.status(201).json({ breeder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
