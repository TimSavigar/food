const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const logger = require('../utils/logger');

// Generate sitemap
router.get('/sitemap', async (req, res) => {
  try {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');

    const smStream = new SitemapStream({ hostname: process.env.BASE_URL || 'https://recipe-ideas.food' });
    const pipeline = smStream.pipe(createGzip());

    // Add static pages
    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    smStream.write({ url: '/recipes', changefreq: 'daily', priority: 0.9 });
    smStream.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });
    smStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.7 });

    // Add recipe pages
    const recipes = await Recipe.find({}, 'slug updatedAt');
    recipes.forEach(recipe => {
      smStream.write({
        url: `/recipe/${recipe.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: recipe.updatedAt
      });
    });

    smStream.end();

    pipeline.pipe(res).on('error', (e) => {
      throw e;
    });

  } catch (error) {
    logger.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
});

// Generate robots.txt
router.get('/robots', (req, res) => {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${process.env.BASE_URL || 'https://recipe-ideas.food'}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Crawl delay
Crawl-delay: 1`;

  res.type('text/plain');
  res.send(robotsTxt);
});

// Generate recipe structured data
router.get('/structured-data/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const recipe = await Recipe.findOne({ slug });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": recipe.name,
      "description": recipe.description,
      "image": recipe.imageUrl,
      "author": {
        "@type": "Organization",
        "name": "Recipe Ideas"
      },
      "datePublished": recipe.createdAt,
      "dateModified": recipe.updatedAt,
      "prepTime": `PT${recipe.prepTime}M`,
      "cookTime": `PT${recipe.cookTime}M`,
      "totalTime": `PT${recipe.totalTime}M`,
      "recipeYield": `${recipe.servings} servings`,
      "recipeCategory": recipe.cuisine,
      "recipeCuisine": recipe.cuisine,
      "keywords": recipe.tags.join(', '),
      "recipeIngredient": recipe.ingredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name}`),
      "recipeInstructions": recipe.instructions.map((instruction, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "text": instruction
      })),
      "nutrition": {
        "@type": "NutritionInformation",
        "calories": `${recipe.nutrition.calories} calories`,
        "proteinContent": `${recipe.nutrition.protein}g`,
        "carbohydrateContent": `${recipe.nutrition.carbs}g`,
        "fatContent": `${recipe.nutrition.fat}g`,
        "fiberContent": `${recipe.nutrition.fiber}g`
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": recipe.rating,
        "reviewCount": recipe.reviewCount
      }
    };

    res.json(structuredData);

  } catch (error) {
    logger.error('Structured data generation error:', error);
    res.status(500).json({ error: 'Failed to generate structured data' });
  }
});

module.exports = router; 