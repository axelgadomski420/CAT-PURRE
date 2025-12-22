const express = require('express');
const router = express.Router();

router.get('/feed', async (req, res) => {
  try {
    const posts = [
      {
        id: 1,
        catId: '123',
        content: 'Mój piękny kot!',
        likes: 45,
        comments: 12,
        createdAt: new Date()
      }
    ];
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/posts', async (req, res) => {
  try {
    const { catId, content } = req.body;
    res.status(201).json({ success: true, postId: Date.now() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
