const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

// Initialize OpenAI client once
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Basic rate limiting for image generation requests (more restrictive due to cost)
const imageLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 25, // 25 requests per IP per hour
  message: 'Too many image generation requests. Please try again later.'
});

router.use(imageLimiter);

/**
 * POST /api/images/generate
 * Request body: {
 *   "prompt": "A bowl of ramen in cyberpunk style",
 *   "size": "1024x1024" // optional – defaults to 512x512
 * }
 * Response: { imageUrl: "https://..." }
 */
router.post('/generate', async (req, res) => {
  try {
    const { prompt, size = '512x512' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ message: 'Prompt is required and must be a string.' });
    }

    // Log the prompt for monitoring (do *not* log user identifiers)
    logger.info(`Generating AI image for prompt: ${prompt}`);

    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size,
    });

    // The OpenAI SDK v4 returns URLs under imageResponse.data[0].url
    const url = imageResponse?.data?.[0]?.url;

    if (!url) {
      return res.status(500).json({ message: 'Failed to generate image. No URL returned.' });
    }

    res.json({ imageUrl: url });
  } catch (error) {
    logger.error('AI Image generation error', error);
    let status = 500;
    if (error?.response?.status) {
      status = error.response.status;
    }
    res.status(status).json({ message: 'Error generating image', error: error.message });
  }
});

module.exports = router;