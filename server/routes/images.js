const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const adminAuth = require('../middleware/adminAuth');
const Recipe = require('../models/Recipe');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST /api/images/generate
 *
 * Request body:
 * {
 *   "prompt": "A delicious plate of pasta, overhead shot, bright natural lighting",
 *   "size": "1024x1024",          // optional, defaults to 1024x1024
 *   "recipeId": "<mongoId>"        // optional – if provided the generated image URL will be saved on the recipe
 * }
 */
router.post('/generate', adminAuth, async (req, res) => {
  try {
    const { prompt, size = '1024x1024', recipeId } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ message: 'Prompt is required and must be a string.' });
    }

    // Call OpenAI Images (DALL·E)
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size,
      quality: 'standard',
    });

    if (!response || !response.data || !response.data.length) {
      return res.status(500).json({ message: 'Failed to generate image. No data returned.' });
    }

    const imageUrl = response.data[0].url;

    // Optionally attach image to a recipe
    if (recipeId) {
      try {
        await Recipe.findByIdAndUpdate(recipeId, { imageUrl });
      } catch (updateErr) {
        // Log but do not fail the request if update fails
        console.error('Failed to update recipe with generated image:', updateErr);
      }
    }

    res.json({ imageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ message: 'Error generating image', error: error.message });
  }
});

module.exports = router;