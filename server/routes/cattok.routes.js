const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/videos/' });

router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { catId, title, description } = req.body;
    res.json({ success: true, videoId: Date.now() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/for-you/:userId', async (req, res) => {
  try {
    const videos = [
      {
        id: 1,
        videoUrl: '/videos/cat1.mp4',
        catName: 'Luna',
        likes: 1234,
        views: 5678
      }
    ];
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
