const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const OpenAI = require('openai');

// Basic rate limiting for this expensive operation
const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 images per IP per hour
  message: 'Too many image generations from this IP, please try again later.'
});

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * POST /api/images/generate
 * Body { prompt: string, size?: number }
 * Returns { url: string }
 */
router.post('/generate', generateLimiter, async (req, res) => {
  try {
    const { prompt, size = 512 } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // Guard size
    const allowedSizes = [256, 512, 1024];
    const imageSize = allowedSizes.includes(size) ? size : 512;

    // Ask OpenAI (DALL·E) to create an image
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: `${imageSize}x${imageSize}`
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      return res.status(500).json({ message: 'Failed to generate image' });
    }

    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ message: 'Image generation failed', error: error.message });
  }
});

module.exports = router;