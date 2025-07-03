const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { validateRecipe } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');
const cache = require('../utils/cache');
const logger = require('../utils/logger');

// Get all recipes with advanced filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      cuisine,
      dietary,
      allergens,
      difficulty,
      prepTime,
      cookTime,
      calories,
      rating,
      occasion,
      cookingMethod,
      priceRange,
      flavorProfile,
      servingSize,
      sustainability,
      seasonal,
      featured,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Cuisine filter
    if (cuisine) {
      filter.cuisine = { $in: cuisine.split(',') };
    }

    // Dietary restrictions
    if (dietary) {
      filter.dietary = { $in: dietary.split(',') };
    }

    // Allergen exclusions
    if (allergens) {
      const allergenList = allergens.split(',');
      filter.allergens = { $nin: allergenList };
    }

    // Difficulty level
    if (difficulty) {
      filter.difficulty = { $in: difficulty.split(',') };
    }

    // Time filters
    if (prepTime) {
      const [min, max] = prepTime.split('-').map(Number);
      filter.prepTime = {};
      if (min) filter.prepTime.$gte = min;
      if (max) filter.prepTime.$lte = max;
    }

    if (cookTime) {
      const [min, max] = cookTime.split('-').map(Number);
      filter.cookTime = {};
      if (min) filter.cookTime.$gte = min;
      if (max) filter.cookTime.$lte = max;
    }

    // Calorie range
    if (calories) {
      const [min, max] = calories.split('-').map(Number);
      filter['nutrition.calories'] = {};
      if (min) filter['nutrition.calories'].$gte = min;
      if (max) filter['nutrition.calories'].$lte = max;
    }

    // Rating filter
    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }

    // Occasion filter
    if (occasion) {
      filter.occasion = { $in: occasion.split(',') };
    }

    // Cooking method
    if (cookingMethod) {
      filter.cookingMethod = { $in: cookingMethod.split(',') };
    }

    // Price range
    if (priceRange) {
      filter.priceRange = { $in: priceRange.split(',') };
    }

    // Flavor profile
    if (flavorProfile) {
      filter.flavorProfile = { $in: flavorProfile.split(',') };
    }

    // Serving size
    if (servingSize) {
      filter.servingSize = { $in: servingSize.split(',') };
    }

    // Sustainability
    if (sustainability) {
      filter.sustainability = { $in: sustainability.split(',') };
    }

    // Seasonal filter
    if (seasonal === 'true') {
      filter.seasonal = true;
    }

    // Featured filter
    if (featured === 'true') {
      filter.featured = true;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const recipes = await Recipe.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-reviews')
      .lean();

    // Get total count for pagination
    const total = await Recipe.countDocuments(filter);

    res.json({
      recipes,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: skip + recipes.length < total,
        hasPrev: parseInt(page) > 1
      },
      total
    });

  } catch (error) {
    logger.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Get recipe by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const recipe = await Recipe.findOne({ slug })
      .populate('reviews.userId', 'username')
      .lean();

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Increment view count
    await Recipe.updateOne(
      { slug },
      { $inc: { views: 1 } }
    );

    res.json(recipe);

  } catch (error) {
    logger.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// Get featured recipes
router.get('/featured/recipes', async (req, res) => {
  try {
    const cacheKey = 'featured_recipes';
    let recipes = await cache.get(cacheKey);

    if (!recipes) {
      recipes = await Recipe.getFeatured(6);
      await cache.set(cacheKey, recipes, 3600); // Cache for 1 hour
    }

    res.json(recipes);

  } catch (error) {
    logger.error('Error fetching featured recipes:', error);
    res.status(500).json({ error: 'Failed to fetch featured recipes' });
  }
});

// Get seasonal recipes
router.get('/seasonal/recipes', async (req, res) => {
  try {
    const { season } = req.query;
    const currentSeason = season || getCurrentSeason();
    
    const cacheKey = `seasonal_recipes_${currentSeason}`;
    let recipes = await cache.get(cacheKey);

    if (!recipes) {
      recipes = await Recipe.getSeasonal(currentSeason, 6);
      await cache.set(cacheKey, recipes, 3600); // Cache for 1 hour
    }

    res.json(recipes);

  } catch (error) {
    logger.error('Error fetching seasonal recipes:', error);
    res.status(500).json({ error: 'Failed to fetch seasonal recipes' });
  }
});

// Get meal of the day
router.get('/meal-of-the-day', async (req, res) => {
  try {
    const cacheKey = 'meal_of_the_day';
    let meal = await cache.get(cacheKey);

    if (!meal) {
      // Get a random featured recipe or high-rated recipe
      meal = await Recipe.aggregate([
        { $match: { $or: [{ featured: true }, { rating: { $gte: 4 } }] } },
        { $sample: { size: 1 } }
      ]);

      if (meal.length > 0) {
        meal = meal[0];
        await cache.set(cacheKey, meal, 86400); // Cache for 24 hours
      }
    }

    res.json(meal);

  } catch (error) {
    logger.error('Error fetching meal of the day:', error);
    res.status(500).json({ error: 'Failed to fetch meal of the day' });
  }
});

// Add review to recipe
router.post('/:slug/reviews', authenticateToken, async (req, res) => {
  try {
    const { slug } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const recipe = await Recipe.findOne({ slug });
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Check if user already reviewed this recipe
    const existingReview = recipe.reviews.find(
      review => review.userId.toString() === userId
    );

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this recipe' });
    }

    // Add new review
    recipe.reviews.push({
      userId,
      rating,
      comment
    });

    // Update rating
    recipe.updateRating();
    await recipe.save();

    res.json({ message: 'Review added successfully', recipe });

  } catch (error) {
    logger.error('Error adding review:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// Toggle favorite recipe
router.post('/:slug/favorite', authenticateToken, async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id;

    const recipe = await Recipe.findOne({ slug });
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const isFavorited = recipe.favorites.includes(userId);
    
    if (isFavorited) {
      recipe.favorites = recipe.favorites.filter(id => id.toString() !== userId);
    } else {
      recipe.favorites.push(userId);
    }

    await recipe.save();

    res.json({ 
      message: isFavorited ? 'Recipe removed from favorites' : 'Recipe added to favorites',
      isFavorited: !isFavorited
    });

  } catch (error) {
    logger.error('Error toggling favorite:', error);
    res.status(500).json({ error: 'Failed to toggle favorite' });
  }
});

// Get recipe suggestions based on current recipe
router.get('/:slug/suggestions', async (req, res) => {
  try {
    const { slug } = req.params;
    const { limit = 4 } = req.query;

    const recipe = await Recipe.findOne({ slug });
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Find similar recipes based on cuisine, dietary preferences, and tags
    const suggestions = await Recipe.find({
      _id: { $ne: recipe._id },
      $or: [
        { cuisine: recipe.cuisine },
        { dietary: { $in: recipe.dietary } },
        { tags: { $in: recipe.tags } }
      ]
    })
    .sort({ rating: -1, reviewCount: -1 })
    .limit(parseInt(limit))
    .select('-reviews')
    .lean();

    res.json(suggestions);

  } catch (error) {
    logger.error('Error fetching recipe suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

// Admin routes (protected)
router.post('/', authenticateToken, validateRecipe, async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      createdBy: req.user.id
    });

    await recipe.save();
    res.status(201).json(recipe);

  } catch (error) {
    logger.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

router.put('/:id', authenticateToken, validateRecipe, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);

  } catch (error) {
    logger.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted successfully' });

  } catch (error) {
    logger.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// Helper function to get current season
function getCurrentSeason() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

module.exports = router; 