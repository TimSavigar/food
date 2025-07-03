const Redis = require('redis');
const logger = require('./logger');

let redisClient = null;

const connectRedis = async () => {
  try {
    redisClient = Redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    redisClient.on('error', (err) => {
      logger.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      logger.info('Redis Client Connected');
    });

    await redisClient.connect();
  } catch (error) {
    logger.error('Redis connection failed:', error);
    // Fallback to in-memory cache if Redis is not available
    redisClient = null;
  }
};

const get = async (key) => {
  try {
    if (!redisClient) return null;
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    logger.error('Redis get error:', error);
    return null;
  }
};

const set = async (key, value, ttl = 3600) => {
  try {
    if (!redisClient) return;
    await redisClient.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    logger.error('Redis set error:', error);
  }
};

const del = async (key) => {
  try {
    if (!redisClient) return;
    await redisClient.del(key);
  } catch (error) {
    logger.error('Redis del error:', error);
  }
};

const flush = async () => {
  try {
    if (!redisClient) return;
    await redisClient.flushAll();
  } catch (error) {
    logger.error('Redis flush error:', error);
  }
};

// Initialize Redis connection
connectRedis();

module.exports = {
  get,
  set,
  del,
  flush,
  connectRedis
}; 