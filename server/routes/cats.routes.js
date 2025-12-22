const express = require('express');
const router = express.Router();
const Cat = require('../models/Cat.model');

// Get all cats with filters
router.get('/', async (req, res) => {
  try {
    const { breed, location, minPrice, maxPrice, gender, status } = req.query;
    
    let filter = {};
    
    if (breed) filter.breed = breed;
    if (location) filter['location.city'] = new RegExp(location, 'i');
    if (gender) filter.gender = gender;
    if (status) filter.status = status;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    const cats = await Cat.find(filter)
      .populate('breeder')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ cats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single cat
router.get('/:id', async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id).populate('breeder');
    
    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }

    // Increment views
    cat.views = (cat.views || 0) + 1;
    await cat.save();

    res.json({ cat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new cat (breeder only)
router.post('/', async (req, res) => {
  try {
    const cat = new Cat(req.body);
    await cat.save();
    
    res.status(201).json({ cat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update cat
router.put('/:id', async (req, res) => {
  try {
    const cat = await Cat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }

    res.json({ cat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete cat
router.delete('/:id', async (req, res) => {
  try {
    const cat = await Cat.findByIdAndDelete(req.params.id);

    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }

    res.json({ message: 'Cat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like cat
router.post('/:id/like', async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    cat.likes = (cat.likes || 0) + 1;
    await cat.save();

    res.json({ likes: cat.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
