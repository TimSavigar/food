const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const OpenAI = require('openai');
const adminAuth = require('../middleware/adminAuth');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Apply admin authentication to all routes
router.use(adminAuth);

// Get all recipes (admin view)
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
});

// Create new recipe
router.post('/recipes', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: 'Error creating recipe', error: error.message });
  }
});

// Update recipe
router.put('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: 'Error updating recipe', error: error.message });
  }
});

// Delete recipe
router.delete('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting recipe', error: error.message });
  }
});

// AI Recipe Generation
router.post('/recipes/ai-generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // Enhanced prompt for better recipe generation
    const enhancedPrompt = `
      Create detailed recipes based on this request: "${prompt}"
      
      For each recipe, provide:
      - Title
      - Description (2-3 sentences)
      - Cuisine type
      - Prep time in minutes
      - Cook time in minutes
      - Servings
      - Difficulty (Easy/Medium/Hard)
      - Ingredients list (with amounts)
      - Step-by-step instructions
      - Tags (cuisine, dietary, occasion)
      
      Format as JSON array with this structure:
      {
        "title": "Recipe Name",
        "description": "Brief description",
        "cuisine": "Cuisine type",
        "prepTime": 15,
        "cookTime": 30,
        "servings": 4,
        "difficulty": "Easy",
        "ingredients": ["2 cups flour", "1 cup water"],
        "instructions": ["Step 1", "Step 2"],
        "tags": ["italian", "vegetarian", "dinner"]
      }
      
      Generate 3-5 recipes based on the request. Make them diverse and interesting.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a culinary expert and recipe creator. Create detailed, accurate, and delicious recipes. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: enhancedPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const response = completion.choices[0].message.content;
    
    // Parse the JSON response
    let recipes;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        recipes = JSON.parse(jsonMatch[0]);
      } else {
        recipes = JSON.parse(response);
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return res.status(500).json({ 
        message: 'Error parsing AI response', 
        error: parseError.message,
        rawResponse: response 
      });
    }

    // Validate and save recipes
    const savedRecipes = [];
    for (const recipeData of recipes) {
      try {
        // Validate required fields
        if (!recipeData.title || !recipeData.ingredients || !recipeData.instructions) {
          console.warn('Skipping invalid recipe:', recipeData);
          continue;
        }

        // Create recipe object
        let imageUrl = recipeData.imageUrl || '';

        // If no imageUrl provided, generate one with DALL·E
        if (!imageUrl) {
          try {
            const imagePrompt = `Professional food photograph, ${recipeData.title}, plated beautifully, overhead shot, bright natural lighting, high resolution`;
            const imgResponse = await openai.images.generate({
              model: 'dall-e-3',
              prompt: imagePrompt,
              n: 1,
              size: '1024x1024',
              quality: 'standard',
            });
            if (imgResponse && imgResponse.data && imgResponse.data.length) {
              imageUrl = imgResponse.data[0].url;
            }
          } catch (imgErr) {
            console.error('Error generating image for recipe:', recipeData.title, imgErr);
          }
        }

        const recipe = new Recipe({
          name: recipeData.title, // using name field in schema
          description: recipeData.description || '',
          cuisine: recipeData.cuisine || 'International',
          prepTime: recipeData.prepTime || 0,
          cookTime: recipeData.cookTime || 0,
          servings: recipeData.servings || 1,
          difficulty: (recipeData.difficulty || 'Medium').toLowerCase(),
          ingredients: recipeData.ingredients || [],
          instructions: recipeData.instructions || [],
          tags: recipeData.tags || [],
          imageUrl,
        });

        await recipe.save();
        savedRecipes.push(recipe);
      } catch (saveError) {
        console.error('Error saving recipe:', saveError);
        // Continue with other recipes even if one fails
      }
    }

    res.json({
      message: `Successfully generated ${savedRecipes.length} recipes`,
      recipes: savedRecipes,
      totalRequested: recipes.length,
      totalSaved: savedRecipes.length
    });

  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ 
      message: 'Error generating recipes with AI', 
      error: error.message 
    });
  }
});

// Get recipe by ID (admin view)
router.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error: error.message });
  }
});

module.exports = router; 