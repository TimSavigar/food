const AWS = require('aws-sdk');
const logger = require('../utils/logger');

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION || 'us-east-1'
});

// DynamoDB table names
const TABLES = {
  RECIPES: process.env.DYNAMODB_RECIPES_TABLE || 'recipe-ideas-recipes',
  USERS: process.env.DYNAMODB_USERS_TABLE || 'recipe-ideas-users',
  REVIEWS: process.env.DYNAMODB_REVIEWS_TABLE || 'recipe-ideas-reviews'
};

// Initialize DynamoDB tables
const initializeTables = async () => {
  const dynamodb = new AWS.DynamoDB();
  
  try {
    // Create Recipes table
    const recipesTableParams = {
      TableName: TABLES.RECIPES,
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },  // Partition key
        { AttributeName: 'slug', KeyType: 'RANGE' } // Sort key
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'slug', AttributeType: 'S' },
        { AttributeName: 'cuisine', AttributeType: 'S' },
        { AttributeName: 'featured', AttributeType: 'S' },
        { AttributeName: 'rating', AttributeType: 'N' },
        { AttributeName: 'createdAt', AttributeType: 'S' }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'cuisine-index',
          KeySchema: [
            { AttributeName: 'cuisine', KeyType: 'HASH' },
            { AttributeName: 'rating', KeyType: 'RANGE' }
          ],
          Projection: { ProjectionType: 'ALL' },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        },
        {
          IndexName: 'featured-index',
          KeySchema: [
            { AttributeName: 'featured', KeyType: 'HASH' },
            { AttributeName: 'rating', KeyType: 'RANGE' }
          ],
          Projection: { ProjectionType: 'ALL' },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        },
        {
          IndexName: 'createdAt-index',
          KeySchema: [
            { AttributeName: 'createdAt', KeyType: 'HASH' },
            { AttributeName: 'rating', KeyType: 'RANGE' }
          ],
          Projection: { ProjectionType: 'ALL' },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    };

    // Create Users table
    const usersTableParams = {
      TableName: TABLES.USERS,
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'email', AttributeType: 'S' }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'email-index',
          KeySchema: [
            { AttributeName: 'email', KeyType: 'HASH' }
          ],
          Projection: { ProjectionType: 'ALL' },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    };

    // Create Reviews table
    const reviewsTableParams = {
      TableName: TABLES.REVIEWS,
      KeySchema: [
        { AttributeName: 'recipeId', KeyType: 'HASH' },
        { AttributeName: 'userId', KeyType: 'RANGE' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'recipeId', AttributeType: 'S' },
        { AttributeName: 'userId', AttributeType: 'S' },
        { AttributeName: 'rating', AttributeType: 'N' }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'rating-index',
          KeySchema: [
            { AttributeName: 'recipeId', KeyType: 'HASH' },
            { AttributeName: 'rating', KeyType: 'RANGE' }
          ],
          Projection: { ProjectionType: 'ALL' },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    };

    // Create tables if they don't exist
    try {
      await dynamodb.createTable(recipesTableParams).promise();
      logger.info('Recipes table created successfully');
    } catch (error) {
      if (error.code === 'ResourceInUseException') {
        logger.info('Recipes table already exists');
      } else {
        logger.error('Error creating recipes table:', error);
      }
    }

    try {
      await dynamodb.createTable(usersTableParams).promise();
      logger.info('Users table created successfully');
    } catch (error) {
      if (error.code === 'ResourceInUseException') {
        logger.info('Users table already exists');
      } else {
        logger.error('Error creating users table:', error);
      }
    }

    try {
      await dynamodb.createTable(reviewsTableParams).promise();
      logger.info('Reviews table created successfully');
    } catch (error) {
      if (error.code === 'ResourceInUseException') {
        logger.info('Reviews table already exists');
      } else {
        logger.error('Error creating reviews table:', error);
      }
    }

  } catch (error) {
    logger.error('Error initializing DynamoDB tables:', error);
  }
};

// Test DynamoDB connection
const testConnection = async () => {
  try {
    const params = {
      TableName: TABLES.RECIPES,
      Limit: 1
    };
    
    await dynamoDB.scan(params).promise();
    logger.info('DynamoDB connection successful');
    return true;
  } catch (error) {
    logger.error('DynamoDB connection failed:', error);
    return false;
  }
};

// Initialize tables on startup
const connectDB = async () => {
  logger.info('Connecting to AWS DynamoDB...');
  
  if (process.env.NODE_ENV === 'development') {
    await initializeTables();
  }
  
  const isConnected = await testConnection();
  
  if (isConnected) {
    logger.info('DynamoDB connected successfully');
  } else {
    logger.error('Failed to connect to DynamoDB');
    process.exit(1);
  }
};

module.exports = {
  dynamoDB,
  TABLES,
  connectDB,
  testConnection
}; 