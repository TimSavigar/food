const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const cache = require('../utils/cache');
const logger = require('../utils/logger');

// Get all available filter options
router.get('/options', async (req, res) => {
  try {
    const cacheKey = 'filter_options';
    let filterOptions = await cache.get(cacheKey);

    if (!filterOptions) {
      // Get unique values for each filter category
      const [cuisines, dietary, allergens, difficulties, occasions, cookingMethods, priceRanges, flavorProfiles, servingSizes, sustainability] = await Promise.all([
        Recipe.distinct('cuisine'),
        Recipe.distinct('dietary'),
        Recipe.distinct('allergens'),
        Recipe.distinct('difficulty'),
        Recipe.distinct('occasion'),
        Recipe.distinct('cookingMethod'),
        Recipe.distinct('priceRange'),
        Recipe.distinct('flavorProfile'),
        Recipe.distinct('servingSize'),
        Recipe.distinct('sustainability')
      ]);

      filterOptions = {
        cuisines: cuisines.map(cuisine => ({
          value: cuisine,
          label: cuisine.charAt(0).toUpperCase() + cuisine.slice(1).replace('-', ' ')
        })),
        dietary: dietary.map(diet => ({
          value: diet,
          label: diet.charAt(0).toUpperCase() + diet.slice(1).replace('-', ' ')
        })),
        allergens: allergens.map(allergen => ({
          value: allergen,
          label: allergen.charAt(0).toUpperCase() + allergen.slice(1).replace('-', ' ')
        })),
        difficulties: difficulties.map(difficulty => ({
          value: difficulty,
          label: difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
        })),
        occasions: occasions.map(occasion => ({
          value: occasion,
          label: occasion.charAt(0).toUpperCase() + occasion.slice(1).replace('-', ' ')
        })),
        cookingMethods: cookingMethods.map(method => ({
          value: method,
          label: method.charAt(0).toUpperCase() + method.slice(1).replace('-', ' ')
        })),
        priceRanges: priceRanges.map(range => ({
          value: range,
          label: range.charAt(0).toUpperCase() + range.slice(1)
        })),
        flavorProfiles: flavorProfiles.map(flavor => ({
          value: flavor,
          label: flavor.charAt(0).toUpperCase() + flavor.slice(1)
        })),
        servingSizes: servingSizes.map(size => ({
          value: size,
          label: size.charAt(0).toUpperCase() + size.slice(1)
        })),
        sustainability: sustainability.map(sustain => ({
          value: sustain,
          label: sustain.charAt(0).toUpperCase() + sustain.slice(1).replace('-', ' ')
        }))
      };

      await cache.set(cacheKey, filterOptions, 3600); // Cache for 1 hour
    }

    res.json(filterOptions);

  } catch (error) {
    logger.error('Error fetching filter options:', error);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
});

// Get popular tags
router.get('/tags', async (req, res) => {
  try {
    const cacheKey = 'popular_tags';
    let tags = await cache.get(cacheKey);

    if (!tags) {
      // Get all tags and count their occurrences
      const recipes = await Recipe.find({}, 'tags');
      const tagCounts = {};
      
      recipes.forEach(recipe => {
        recipe.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });

      // Sort by count and get top 50
      tags = Object.entries(tagCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 50)
        .map(([tag, count]) => ({ tag, count }));

      await cache.set(cacheKey, tags, 3600); // Cache for 1 hour
    }

    res.json(tags);

  } catch (error) {
    logger.error('Error fetching popular tags:', error);
    res.status(500).json({ error: 'Failed to fetch popular tags' });
  }
});

// Get ingredient suggestions
router.get('/ingredients', async (req, res) => {
  try {
    const { q } = req.query;
    const cacheKey = `ingredients_${q || 'all'}`;
    let ingredients = await cache.get(cacheKey);

    if (!ingredients) {
      let query = {};
      if (q) {
        query = { 'ingredients.name': { $regex: q, $options: 'i' } };
      }

      const recipes = await Recipe.find(query, 'ingredients.name');
      const ingredientSet = new Set();
      
      recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          ingredientSet.add(ingredient.name.toLowerCase());
        });
      });

      ingredients = Array.from(ingredientSet)
        .sort()
        .slice(0, 100)
        .map(name => ({ name, label: name.charAt(0).toUpperCase() + name.slice(1) }));

      await cache.set(cacheKey, ingredients, 1800); // Cache for 30 minutes
    }

    res.json(ingredients);

  } catch (error) {
    logger.error('Error fetching ingredient suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch ingredient suggestions' });
  }
});

// Get time ranges for filtering
router.get('/time-ranges', async (req, res) => {
  try {
    const timeRanges = [
      { label: 'Quick (0-15 min)', value: '0-15' },
      { label: 'Fast (15-30 min)', value: '15-30' },
      { label: 'Medium (30-60 min)', value: '30-60' },
      { label: 'Long (60+ min)', value: '60-999' }
    ];

    res.json(timeRanges);

  } catch (error) {
    logger.error('Error fetching time ranges:', error);
    res.status(500).json({ error: 'Failed to fetch time ranges' });
  }
});

// Get calorie ranges for filtering
router.get('/calorie-ranges', async (req, res) => {
  try {
    const calorieRanges = [
      { label: 'Low (0-200 cal)', value: '0-200' },
      { label: 'Light (200-400 cal)', value: '200-400' },
      { label: 'Medium (400-600 cal)', value: '400-600' },
      { label: 'High (600-800 cal)', value: '600-800' },
      { label: 'Very High (800+ cal)', value: '800-9999' }
    ];

    res.json(calorieRanges);

  } catch (error) {
    logger.error('Error fetching calorie ranges:', error);
    res.status(500).json({ error: 'Failed to fetch calorie ranges' });
  }
});

// Get seasonal information
router.get('/seasons', async (req, res) => {
  try {
    const seasons = [
      { value: 'spring', label: 'Spring', months: [2, 3, 4] },
      { value: 'summer', label: 'Summer', months: [5, 6, 7] },
      { value: 'fall', label: 'Fall', months: [8, 9, 10] },
      { value: 'winter', label: 'Winter', months: [11, 0, 1] },
      { value: 'all-year', label: 'All Year', months: [] }
    ];

    res.json(seasons);

  } catch (error) {
    logger.error('Error fetching seasons:', error);
    res.status(500).json({ error: 'Failed to fetch seasons' });
  }
});

module.exports = router; 