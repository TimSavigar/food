# Recipe Ideas - AWS Amplify Gen2 Deployment Guide

This guide covers deployment of the Recipe Ideas website using AWS Amplify Gen2, the latest version with enhanced performance and developer experience.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- AWS CLI configured
- AWS account with appropriate permissions
- Git

### Local Development Setup

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd recipe-ideas-food
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

2. **Configure Environment**
   ```bash
   cp env.example .env
   # Edit .env with your AWS configuration
   ```

3. **Start Development Servers**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/health

## ☁️ AWS Amplify Gen2 Deployment

### What's New in Amplify Gen2

Amplify Gen2 offers significant improvements over Gen1:
- **Enhanced Performance**: Faster builds and deployments
- **Better Developer Experience**: Improved CLI and console
- **Advanced Features**: Better Git integration, custom domains, and monitoring
- **Improved Security**: Enhanced IAM integration and security features
- **Better Cost Management**: More granular control over resources

### Option 1: Amplify Gen2 with Full-Stack Deployment (Recommended)

#### 1. Initialize Amplify Gen2

```bash
# Install Amplify CLI (latest version for Gen2)
npm install -g @aws-amplify/cli@latest

# Initialize Amplify Gen2
amplify init --type fullstack
```

#### 2. Configure Amplify Gen2

```bash
cd client
amplify init

# Choose your options:
# - Framework: React
# - Language: JavaScript
# - Source Directory: src
# - Distribution Directory: dist
# - Build Command: npm run build
# - Start Command: npm run dev
# - Use Amplify Gen2: Yes
```

#### 3. Add Backend Services

```bash
# Add API (REST API with Lambda)
amplify add api

# Choose:
# - API Type: REST
# - Function Name: recipeIdeasAPI
# - Lambda Function: Create new function
# - Function Template: CRUD function for DynamoDB
# - Table Name: recipe-ideas-recipes
# - Use Amplify Gen2: Yes
```

#### 4. Add Authentication

```bash
# Add authentication
amplify add auth

# Choose:
# - Default configuration: Default configuration with Social Provider (federation)
# - How do you want users to be able to sign in: Username
# - Do you want to configure advanced settings: No
# - Use Amplify Gen2: Yes
```

#### 5. Add Hosting

```bash
# Add hosting
amplify add hosting

# Choose:
# - Hosting Environment: Amazon CloudFront and S3
# - Use Amplify Gen2: Yes
```

#### 6. Deploy Full Stack

```bash
# Push all changes to AWS
amplify push

# Deploy to production
amplify publish
```

### Option 2: Amplify Gen2 with Separate Backend

For more control over your Node.js backend:

#### Frontend with Amplify Gen2

```bash
cd client
amplify init --type frontend

# Configure frontend
amplify add hosting
amplify push
```

#### Backend with AWS Lambda + API Gateway

```bash
# Create Lambda function for your Node.js backend
aws lambda create-function \
  --function-name recipe-ideas-api-gen2 \
  --runtime nodejs18.x \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --role arn:aws:iam::<account-id>:role/lambda-execution-role \
  --environment Variables='{DYNAMODB_RECIPES_TABLE=recipe-ideas-recipes}'
```

### Option 3: Amplify Gen2 with Custom Domain

```bash
# Add custom domain
amplify add custom-domain

# Configure domain settings
# - Domain name: recipe-ideas.food
# - SSL certificate: Request new certificate
# - Subdomain: www
```

## 🗄️ AWS DynamoDB Setup for Amplify Gen2

### Create DynamoDB Tables

1. **Create Recipes Table**
   ```bash
   aws dynamodb create-table \
     --table-name recipe-ideas-recipes \
     --attribute-definitions \
       AttributeName=id,AttributeType=S \
       AttributeName=slug,AttributeType=S \
       AttributeName=cuisine,AttributeType=S \
       AttributeName=featured,AttributeType=S \
       AttributeName=rating,AttributeType=N \
       AttributeName=createdAt,AttributeType=S \
     --key-schema \
       AttributeName=id,KeyType=HASH \
       AttributeName=slug,KeyType=RANGE \
     --global-secondary-indexes \
       IndexName=cuisine-index,KeySchema=[{AttributeName=cuisine,KeyType=HASH},{AttributeName=rating,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
       IndexName=featured-index,KeySchema=[{AttributeName=featured,KeyType=HASH},{AttributeName=rating,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
       IndexName=createdAt-index,KeySchema=[{AttributeName=createdAt,KeyType=HASH},{AttributeName=rating,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
     --billing-mode PAY_PER_REQUEST
   ```

2. **Create Users Table**
   ```bash
   aws dynamodb create-table \
     --table-name recipe-ideas-users \
     --attribute-definitions \
       AttributeName=id,AttributeType=S \
       AttributeName=email,AttributeType=S \
     --key-schema AttributeName=id,KeyType=HASH \
     --global-secondary-indexes \
       IndexName=email-index,KeySchema=[{AttributeName=email,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
     --billing-mode PAY_PER_REQUEST
   ```

3. **Create Reviews Table**
   ```bash
   aws dynamodb create-table \
     --table-name recipe-ideas-reviews \
     --attribute-definitions \
       AttributeName=recipeId,AttributeType=S \
       AttributeName=userId,AttributeType=S \
       AttributeName=rating,AttributeType=N \
     --key-schema \
       AttributeName=recipeId,KeyType=HASH \
       AttributeName=userId,KeyType=RANGE \
     --global-secondary-indexes \
       IndexName=rating-index,KeySchema=[{AttributeName=recipeId,KeyType=HASH},{AttributeName=rating,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
     --billing-mode PAY_PER_REQUEST
   ```

## 🔧 Amplify Gen2 Configuration

### amplify/backend/backend-config.json (Gen2)

```json
{
  "version": "2.0",
  "api": {
    "recipeIdeasAPI": {
      "service": "API Gateway",
      "providerPlugin": "awscloudformation",
      "dependsOn": [
        {
          "category": "function",
          "resourceName": "recipeIdeasAPI",
          "attributes": ["Name", "Arn"]
        }
      ],
      "gen2": true
    }
  },
  "function": {
    "recipeIdeasAPI": {
      "build": true,
      "providerPlugin": "awscloudformation",
      "service": "Lambda",
      "dependsOn": [],
      "gen2": true,
      "runtime": "nodejs18.x"
    }
  },
  "hosting": {
    "S3AndCloudFront": {
      "service": "S3AndCloudFront",
      "providerPlugin": "awscloudformation",
      "gen2": true
    }
  },
  "auth": {
    "recipeIdeasAuth": {
      "service": "Cognito",
      "providerPlugin": "awscloudformation",
      "gen2": true
    }
  }
}
```

### amplify/backend/function/recipeIdeasAPI/src/index.js (Gen2)

```javascript
const AWS = require('aws-sdk');
const { dynamoDB, TABLES } = require('./config/database');

// Amplify Gen2 handler with improved error handling
exports.handler = async (event) => {
  const { httpMethod, path, queryStringParameters, body, headers } = event;
  
  // CORS headers for Amplify Gen2
  const corsHeaders = {
    'Access-Control-Allow-Origin': headers?.origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };
  
  // Handle preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }
  
  try {
    let result;
    
    switch (httpMethod) {
      case 'GET':
        if (path === '/recipes') {
          result = await getRecipes(queryStringParameters);
        } else if (path.startsWith('/recipes/')) {
          const recipeId = path.split('/')[2];
          result = await getRecipeById(recipeId);
        }
        break;
        
      case 'POST':
        if (path === '/recipes') {
          result = await createRecipe(JSON.parse(body));
        }
        break;
        
      case 'PUT':
        if (path.startsWith('/recipes/')) {
          const recipeId = path.split('/')[2];
          result = await updateRecipe(recipeId, JSON.parse(body));
        }
        break;
        
      case 'DELETE':
        if (path.startsWith('/recipes/')) {
          const recipeId = path.split('/')[2];
          result = await deleteRecipe(recipeId);
        }
        break;
        
      default:
        return {
          statusCode: 405,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    return {
      ...result,
      headers: { ...corsHeaders, ...result.headers }
    };
    
  } catch (error) {
    console.error('Lambda error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};

async function getRecipes(params) {
  const scanParams = {
    TableName: TABLES.RECIPES,
    Limit: parseInt(params?.limit) || 12
  };
  
  if (params?.cuisine) {
    scanParams.FilterExpression = 'cuisine = :cuisine';
    scanParams.ExpressionAttributeValues = {
      ':cuisine': params.cuisine
    };
  }
  
  const result = await dynamoDB.scan(scanParams).promise();
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      recipes: result.Items,
      count: result.Count,
      scannedCount: result.ScannedCount
    })
  };
}

async function getRecipeById(recipeId) {
  const params = {
    TableName: TABLES.RECIPES,
    Key: { id: recipeId }
  };
  
  const result = await dynamoDB.get(params).promise();
  
  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Recipe not found' })
    };
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(result.Item)
  };
}

async function createRecipe(recipeData) {
  const recipeId = Date.now().toString();
  const params = {
    TableName: TABLES.RECIPES,
    Item: {
      id: recipeId,
      slug: recipeData.title.toLowerCase().replace(/\s+/g, '-'),
      ...recipeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };
  
  await dynamoDB.put(params).promise();
  
  return {
    statusCode: 201,
    body: JSON.stringify(params.Item)
  };
}

async function updateRecipe(recipeId, updateData) {
  const updateExpression = [];
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};
  
  Object.keys(updateData).forEach(key => {
    if (key !== 'id') {
      updateExpression.push(`#${key} = :${key}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = updateData[key];
    }
  });
  
  updateExpression.push('#updatedAt = :updatedAt');
  expressionAttributeNames['#updatedAt'] = 'updatedAt';
  expressionAttributeValues[':updatedAt'] = new Date().toISOString();
  
  const params = {
    TableName: TABLES.RECIPES,
    Key: { id: recipeId },
    UpdateExpression: `SET ${updateExpression.join(', ')}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW'
  };
  
  const result = await dynamoDB.update(params).promise();
  
  return {
    statusCode: 200,
    body: JSON.stringify(result.Attributes)
  };
}

async function deleteRecipe(recipeId) {
  const params = {
    TableName: TABLES.RECIPES,
    Key: { id: recipeId }
  };
  
  await dynamoDB.delete(params).promise();
  
  return {
    statusCode: 204,
    body: ''
  };
}
```

## 📊 Amplify Gen2 Monitoring and Analytics

### CloudWatch Integration

Amplify Gen2 provides enhanced CloudWatch integration:

```bash
# View Amplify Gen2 app logs
aws logs describe-log-groups --log-group-name-prefix "/aws/amplify"

# Monitor build status
aws amplify get-job --app-id <app-id> --branch-name main --job-id <job-id>
```

### Amplify Gen2 Console Features

1. **Enhanced Build Monitoring**
   - Real-time build logs
   - Build performance metrics
   - Build history and rollback options

2. **Advanced Analytics**
   - Page views and user behavior
   - Performance metrics
   - Error tracking

3. **Security Monitoring**
   - Access logs
   - Security alerts
   - Compliance reporting

## 🔒 Amplify Gen2 Security

### Enhanced IAM Integration

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": [
        "arn:aws:dynamodb:us-east-1:*:table/recipe-ideas-*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:us-east-1:*:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cognito-idp:AdminGetUser",
        "cognito-idp:AdminCreateUser",
        "cognito-idp:AdminUpdateUserAttributes"
      ],
      "Resource": "arn:aws:cognito-idp:us-east-1:*:userpool/*"
    }
  ]
}
```

### Amplify Gen2 Environment Variables

```env
# Amplify Gen2 Configuration
AMPLIFY_ENV=production
AMPLIFY_APP_ID=your-amplify-app-id
AMPLIFY_BRANCH=main

# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key

# DynamoDB Tables
DYNAMODB_RECIPES_TABLE=recipe-ideas-recipes
DYNAMODB_USERS_TABLE=recipe-ideas-users
DYNAMODB_REVIEWS_TABLE=recipe-ideas-reviews

# Amplify Gen2 Services
AMPLIFY_AUTH_IDENTITY_POOL_ID=your-identity-pool-id
AMPLIFY_AUTH_USER_POOL_ID=your-user-pool-id
AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID=your-client-id

# Security
JWT_SECRET=your-super-secure-jwt-secret-key
NODE_ENV=production

# URLs
BASE_URL=https://recipe-ideas.food
CLIENT_URL=https://recipe-ideas.food

# Analytics
GA_TRACKING_ID=your-ga-tracking-id

# Affiliate
AMAZON_AFFILIATE_ID=your-amazon-affiliate-id
```

## 📈 Amplify Gen2 Cost Optimization

### Build Optimization

```yaml
# amplify.yml (Gen2 optimized)
version: 2
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --only=production
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Lambda Optimization for Gen2

```javascript
// Optimized Lambda function for Amplify Gen2
const AWS = require('aws-sdk');

// Reuse connections for better performance
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  maxRetries: 3,
  httpOptions: {
    timeout: 5000,
    connectTimeout: 3000
  }
});

// Connection pooling for better performance
let connection = null;

const getConnection = async () => {
  if (!connection) {
    connection = await createConnection();
  }
  return connection;
};
```

## 🚨 Amplify Gen2 Troubleshooting

### Common Gen2 Issues

1. **Build Failures**
   ```bash
   # Check build logs
   amplify console
   
   # View specific build
   aws amplify get-job --app-id <app-id> --branch-name main --job-id <job-id>
   ```

2. **Deployment Issues**
   ```bash
   # Check deployment status
   amplify status
   
   # Force redeploy
   amplify push --force
   ```

3. **API Issues**
   ```bash
   # Test API endpoints
   curl -X GET https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/recipes
   
   # Check API Gateway logs
   aws logs describe-log-groups --log-group-name-prefix "API-Gateway-Execution-Logs"
   ```

### Performance Optimization

1. **Build Performance**
   - Use build caching
   - Optimize dependencies
   - Use parallel builds

2. **Runtime Performance**
   - Implement connection pooling
   - Use DynamoDB batch operations
   - Optimize Lambda cold starts

## 🔄 CI/CD with Amplify Gen2

### GitHub Actions for Amplify Gen2

```yaml
name: Deploy to Amplify Gen2

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Install Amplify CLI
        run: npm install -g @aws-amplify/cli@latest
      
      - name: Deploy to Amplify Gen2
        run: |
          amplify publish --yes
        env:
          AMPLIFY_APP_ID: ${{ secrets.AMPLIFY_APP_ID }}
          AMPLIFY_BRANCH: main
```

### Amplify Gen2 Webhooks

```bash
# Set up webhook for automatic deployments
aws amplify create-webhook \
  --app-id <app-id> \
  --branch-name main \
  --webhook-url https://api.github.com/repos/your-repo/hooks
```

This deployment guide is specifically optimized for AWS Amplify Gen2, providing you with the latest features and best practices for your recipe website deployment. 