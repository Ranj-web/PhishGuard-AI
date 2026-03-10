const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get user dashboard stats
router.get('/stats', auth, (req, res) => {
  try {
    // Return demo stats
    res.json({
      totalScans: Math.floor(Math.random() * 100),
      threatsDetected: Math.floor(Math.random() * 20),
      safeUrls: Math.floor(Math.random() * 80),
      accuracy: Math.floor(Math.random() * 30 + 70)
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
