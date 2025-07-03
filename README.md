# Recipe Ideas - Food Enthusiast Website

A comprehensive recipe website for food enthusiasts featuring AI-generated recipes, excellent SEO optimization, and monetization through Google Ads and Amazon affiliate links.

## 🍽️ Features

- **AI-Generated Recipes**: Database of recipes created by AI
- **Advanced Filtering**: Filter by ingredients, cooking styles, meal types, regions, calories, allergies, and more
- **SEO Optimized**: Structured data, meta tags, and performance optimization
- **Monetization Ready**: Google AdSense and Amazon affiliate integration
- **Responsive Design**: Modern UI with Tailwind CSS
- **User Engagement**: Reviews, ratings, and social sharing

## 🚀 Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Query for data fetching
- Framer Motion for animations

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- AWS S3 for image storage
- Redis for caching

### SEO & Performance
- Next.js for SSR/SSG
- Structured data (JSON-LD)
- Meta tags optimization
- Image optimization
- Performance monitoring

## 📁 Project Structure

```
recipe-ideas-food/
├── client/                 # React frontend
├── server/                 # Node.js backend
├── shared/                 # Shared types and utilities
├── docs/                   # Documentation
└── scripts/                # Build and deployment scripts
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recipe-ideas-food
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/recipe-ideas
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-jwt-secret

# AWS
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=recipe-ideas-images

# Google Analytics
GA_TRACKING_ID=your-ga-tracking-id

# Amazon Affiliate
AMAZON_AFFILIATE_ID=your-amazon-affiliate-id
```

## 📊 Database Schema

### Recipes Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  ingredients: [{
    name: String,
    amount: String,
    unit: String,
    category: String
  }],
  instructions: [String],
  prepTime: Number,
  cookTime: Number,
  servings: Number,
  difficulty: String, // easy, medium, expert
  cuisine: String,
  dietary: [String], // vegetarian, vegan, gluten-free, etc.
  allergens: [String],
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  tags: [String],
  imageUrl: String,
  videoUrl: String,
  rating: Number,
  reviewCount: Number,
  featured: Boolean,
  seasonal: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 SEO Features

- **Structured Data**: JSON-LD markup for recipes
- **Meta Tags**: Dynamic meta titles and descriptions
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling configuration
- **Performance**: Optimized images and code splitting
- **Mobile-First**: Responsive design for all devices

## 💰 Monetization

- **Google AdSense**: Display ads throughout the site
- **Amazon Affiliate**: Product recommendations and links
- **Sponsored Content**: Partnership opportunities
- **Premium Features**: Optional subscription model

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker-compose up -d
```

## 📈 Analytics & Monitoring

- Google Analytics 4 integration
- Performance monitoring
- Error tracking
- User behavior analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository. 