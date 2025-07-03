const mongoose = require('mongoose');
const slugify = require('slugify');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['dairy', 'meat', 'seafood', 'vegetables', 'grains', 'fruits', 'spices', 'other'],
    default: 'other'
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  }
});

const nutritionSchema = new mongoose.Schema({
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    default: 0
  },
  carbs: {
    type: Number,
    default: 0
  },
  fat: {
    type: Number,
    default: 0
  },
  fiber: {
    type: Number,
    default: 0
  },
  sugar: {
    type: Number,
    default: 0
  },
  sodium: {
    type: Number,
    default: 0
  }
});

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  ingredients: [ingredientSchema],
  instructions: [{
    type: String,
    required: true
  }],
  prepTime: {
    type: Number,
    required: true,
    min: 0
  },
  cookTime: {
    type: Number,
    required: true,
    min: 0
  },
  totalTime: {
    type: Number,
    required: true
  },
  servings: {
    type: Number,
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'expert'],
    default: 'medium'
  },
  cuisine: {
    type: String,
    required: true,
    enum: [
      'italian', 'mexican', 'asian', 'mediterranean', 'indian', 'french', 
      'american', 'thai', 'japanese', 'chinese', 'greek', 'spanish', 
      'middle-eastern', 'african', 'caribbean', 'latin-american', 'other'
    ]
  },
  dietary: [{
    type: String,
    enum: [
      'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'paleo', 
      'low-carb', 'low-fat', 'high-protein', 'low-sodium', 'heart-healthy'
    ]
  }],
  allergens: [{
    type: String,
    enum: [
      'nuts', 'peanuts', 'tree-nuts', 'milk', 'eggs', 'soy', 'wheat', 
      'fish', 'shellfish', 'sesame', 'sulfites'
    ]
  }],
  nutrition: nutritionSchema,
  tags: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema],
  featured: {
    type: Boolean,
    default: false
  },
  seasonal: {
    type: Boolean,
    default: false
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter', 'all-year'],
    default: 'all-year'
  },
  occasion: [{
    type: String,
    enum: [
      'breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'appetizer',
      'holiday', 'party', 'weeknight', 'weekend', 'romantic', 'family'
    ]
  }],
  cookingMethod: [{
    type: String,
    enum: [
      'grilled', 'baked', 'steamed', 'fried', 'slow-cooked', 'roasted',
      'boiled', 'sautéed', 'braised', 'smoked', 'air-fried', 'raw'
    ]
  }],
  priceRange: {
    type: String,
    enum: ['budget', 'moderate', 'premium'],
    default: 'moderate'
  },
  flavorProfile: [{
    type: String,
    enum: ['spicy', 'sweet', 'savory', 'umami', 'tangy', 'bitter', 'sour']
  }],
  servingSize: {
    type: String,
    enum: ['individual', 'family', 'party'],
    default: 'family'
  },
  sustainability: [{
    type: String,
    enum: ['eco-friendly', 'locally-sourced', 'organic', 'seasonal']
  }],
  affiliateProducts: [{
    name: String,
    description: String,
    amazonUrl: String,
    price: Number,
    category: String
  }],
  views: {
    type: Number,
    default: 0
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isAI: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
recipeSchema.index({ name: 'text', description: 'text', tags: 'text' });
recipeSchema.index({ cuisine: 1, difficulty: 1 });
recipeSchema.index({ dietary: 1 });
recipeSchema.index({ allergens: 1 });
recipeSchema.index({ rating: -1, reviewCount: -1 });
recipeSchema.index({ featured: 1, createdAt: -1 });
recipeSchema.index({ seasonal: 1, season: 1 });

// Virtual for total time
recipeSchema.virtual('totalTime').get(function() {
  return this.prepTime + this.cookTime;
});

// Pre-save middleware to generate slug and calculate total time
recipeSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { 
      lower: true, 
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  
  if (this.isModified('prepTime') || this.isModified('cookTime')) {
    this.totalTime = this.prepTime + this.cookTime;
  }
  
  next();
});

// Method to update rating
recipeSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.reviewCount = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = Math.round((totalRating / this.reviews.length) * 10) / 10;
    this.reviewCount = this.reviews.length;
  }
};

// Static method to get featured recipes
recipeSchema.statics.getFeatured = function(limit = 6) {
  return this.find({ featured: true })
    .sort({ rating: -1, reviewCount: -1 })
    .limit(limit);
};

// Static method to get seasonal recipes
recipeSchema.statics.getSeasonal = function(season, limit = 6) {
  return this.find({ 
    $or: [
      { seasonal: true, season: season },
      { seasonal: false }
    ]
  })
  .sort({ rating: -1, reviewCount: -1 })
  .limit(limit);
};

module.exports = mongoose.model('Recipe', recipeSchema); 