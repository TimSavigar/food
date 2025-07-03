#!/bin/bash

# Recipe Ideas - Setup Script
# This script sets up the complete recipe website environment

set -e

echo "🍽️  Recipe Ideas - Setup Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_status "Node.js version: $(node -v)"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi
    
    print_status "npm version: $(npm -v)"
}

# Check if Docker is installed (optional)
check_docker() {
    if command -v docker &> /dev/null; then
        print_status "Docker is available"
        DOCKER_AVAILABLE=true
    else
        print_warning "Docker is not installed. You can still run the application locally."
        DOCKER_AVAILABLE=false
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    mkdir -p server/logs
    mkdir -p client/public
    mkdir -p scripts
    mkdir -p docs
    
    print_status "Directories created successfully"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install server dependencies
    cd server
    npm install
    cd ..
    
    # Install client dependencies
    cd client
    npm install
    cd ..
    
    print_status "Dependencies installed successfully"
}

# Setup environment file
setup_env() {
    print_status "Setting up environment configuration..."
    
    if [ ! -f .env ]; then
        cp env.example .env
        print_warning "Environment file created from template. Please update .env with your configuration."
    else
        print_status "Environment file already exists"
    fi
}

# Setup database (if MongoDB is available)
setup_database() {
    print_status "Setting up database..."
    
    if command -v mongod &> /dev/null; then
        print_status "MongoDB is available locally"
        # Start MongoDB if not running
        if ! pgrep -x "mongod" > /dev/null; then
            print_warning "MongoDB is not running. Please start MongoDB manually or use Docker."
        fi
    else
        print_warning "MongoDB is not installed locally. You can use Docker or a cloud database."
    fi
}

# Setup Redis (if available)
setup_redis() {
    print_status "Setting up Redis..."
    
    if command -v redis-server &> /dev/null; then
        print_status "Redis is available locally"
        # Start Redis if not running
        if ! pgrep -x "redis-server" > /dev/null; then
            print_warning "Redis is not running. Please start Redis manually or use Docker."
        fi
    else
        print_warning "Redis is not installed locally. You can use Docker or a cloud Redis instance."
    fi
}

# Create sample data script
create_sample_data() {
    print_status "Creating sample data script..."
    
    cat > scripts/seed-data.js << 'EOF'
const mongoose = require('mongoose');
const Recipe = require('../server/models/Recipe');

const sampleRecipes = [
  {
    name: "Classic Margherita Pizza",
    description: "A traditional Italian pizza with fresh mozzarella, basil, and tomato sauce.",
    ingredients: [
      { name: "pizza dough", amount: "1", unit: "ball", category: "grains" },
      { name: "fresh mozzarella", amount: "8", unit: "oz", category: "dairy" },
      { name: "tomato sauce", amount: "1/2", unit: "cup", category: "vegetables" },
      { name: "fresh basil", amount: "1/4", unit: "cup", category: "vegetables" },
      { name: "olive oil", amount: "2", unit: "tbsp", category: "other" }
    ],
    instructions: [
      "Preheat oven to 500°F (260°C)",
      "Roll out the pizza dough on a floured surface",
      "Spread tomato sauce evenly over the dough",
      "Add fresh mozzarella slices",
      "Bake for 12-15 minutes until crust is golden",
      "Add fresh basil leaves before serving"
    ],
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: "medium",
    cuisine: "italian",
    dietary: ["vegetarian"],
    nutrition: {
      calories: 350,
      protein: 15,
      carbs: 45,
      fat: 12,
      fiber: 3
    },
    tags: ["pizza", "italian", "vegetarian", "quick"],
    imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800",
    featured: true,
    seasonal: false
  },
  {
    name: "Chicken Tikka Masala",
    description: "A creamy and flavorful Indian curry with tender chicken pieces.",
    ingredients: [
      { name: "chicken breast", amount: "1", unit: "lb", category: "meat" },
      { name: "yogurt", amount: "1/2", unit: "cup", category: "dairy" },
      { name: "tomato sauce", amount: "1", unit: "can", category: "vegetables" },
      { name: "heavy cream", amount: "1/2", unit: "cup", category: "dairy" },
      { name: "garam masala", amount: "2", unit: "tsp", category: "spices" }
    ],
    instructions: [
      "Marinate chicken in yogurt and spices for 30 minutes",
      "Grill chicken until charred on both sides",
      "Sauté onions and garlic in oil",
      "Add tomato sauce and simmer",
      "Add cream and cooked chicken",
      "Simmer for 10 minutes until sauce thickens"
    ],
    prepTime: 30,
    cookTime: 25,
    servings: 4,
    difficulty: "medium",
    cuisine: "indian",
    dietary: ["high-protein"],
    nutrition: {
      calories: 450,
      protein: 35,
      carbs: 15,
      fat: 25,
      fiber: 4
    },
    tags: ["curry", "indian", "chicken", "spicy"],
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
    featured: true,
    seasonal: false
  }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-ideas');
    
    // Clear existing data
    await Recipe.deleteMany({});
    
    // Insert sample recipes
    await Recipe.insertMany(sampleRecipes);
    
    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
EOF

    print_status "Sample data script created at scripts/seed-data.js"
}

# Main setup function
main() {
    print_status "Starting setup..."
    
    check_node
    check_npm
    check_docker
    create_directories
    install_dependencies
    setup_env
    setup_database
    setup_redis
    create_sample_data
    
    echo ""
    print_status "Setup completed successfully! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Update .env file with your configuration"
    echo "2. Start MongoDB and Redis (or use Docker)"
    echo "3. Run 'npm run dev' to start the development servers"
    echo "4. Visit http://localhost:3000 to see your website"
    echo ""
    echo "For production deployment:"
    echo "1. Update environment variables for production"
    echo "2. Run 'docker-compose up -d' to start all services"
    echo ""
}

# Run main function
main "$@" 