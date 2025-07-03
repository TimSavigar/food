const { body, validationResult } = require('express-validator');

const validateRecipe = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Recipe name must be between 3 and 200 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('At least one ingredient is required'),
  
  body('ingredients.*.name')
    .trim()
    .notEmpty()
    .withMessage('Ingredient name is required'),
  
  body('ingredients.*.amount')
    .trim()
    .notEmpty()
    .withMessage('Ingredient amount is required'),
  
  body('ingredients.*.unit')
    .trim()
    .notEmpty()
    .withMessage('Ingredient unit is required'),
  
  body('instructions')
    .isArray({ min: 1 })
    .withMessage('At least one instruction is required'),
  
  body('instructions.*')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Each instruction must be at least 10 characters'),
  
  body('prepTime')
    .isInt({ min: 0 })
    .withMessage('Prep time must be a positive number'),
  
  body('cookTime')
    .isInt({ min: 0 })
    .withMessage('Cook time must be a positive number'),
  
  body('servings')
    .isInt({ min: 1 })
    .withMessage('Servings must be at least 1'),
  
  body('difficulty')
    .isIn(['easy', 'medium', 'expert'])
    .withMessage('Difficulty must be easy, medium, or expert'),
  
  body('cuisine')
    .trim()
    .notEmpty()
    .withMessage('Cuisine is required'),
  
  body('nutrition.calories')
    .isInt({ min: 0 })
    .withMessage('Calories must be a positive number'),
  
  body('imageUrl')
    .isURL()
    .withMessage('Valid image URL is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateRecipe
}; 