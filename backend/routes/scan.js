const express = require('express');
const { auth } = require('../middleware/auth');
const { analyzeUrl } = require('../ai/phishingDetector');

const router = express.Router();

// URL analysis endpoint
router.post('/url', (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    // Analyze the URL
    const analysis = analyzeUrl(url);

    res.json({
      url,
      riskLevel: analysis.riskLevel,
      confidence: analysis.confidence,
      features: analysis.features,
      message: analysis.message
    });
  } catch (error) {
    console.error('URL analysis error:', error);
    res.status(500).json({ message: 'Analysis failed' });
  }
});

// Email analysis endpoint
router.post('/email', auth, (req, res) => {
  try {
    const { emailText } = req.body;

    if (!emailText) {
      return res.status(400).json({ message: 'Email text is required' });
    }

    // Basic keyword-based analysis
    const suspiciousKeywords = ['urgent', 'password', 'bank', 'account', 'verify', 'click here'];
    const foundKeywords = suspiciousKeywords.filter(keyword =>
      emailText.toLowerCase().includes(keyword)
    );

    const isPhishing = foundKeywords.length > 2;
    const confidence = Math.min(foundKeywords.length * 20, 100);

    res.json({
      isPhishing,
      confidence,
      suspiciousKeywords: foundKeywords,
      analysis: isPhishing ? 'Potentially dangerous email' : 'Email appears safe'
    });
  } catch (error) {
    console.error('Email analysis error:', error);
    res.status(500).json({ message: 'Analysis failed' });
  }
});

// Browser activity monitor endpoint
router.get('/activity', auth, (req, res) => {
  try {
    // Return sample activity data
    const activities = [
      { url: 'https://google.com', safe: true, timestamp: new Date(Date.now() - 60000) },
      { url: 'https://github.com', safe: true, timestamp: new Date(Date.now() - 120000) },
      { url: 'https://stackoverflow.com', safe: true, timestamp: new Date(Date.now() - 180000) },
      { url: 'https://facebook.com', safe: true, timestamp: new Date(Date.now() - 240000) }
    ];
    res.json(activities);
  } catch (error) {
    console.error('Activity fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch activity' });
  }
});

module.exports = router;
