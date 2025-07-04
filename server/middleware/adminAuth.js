const adminAuth = (req, res, next) => {
  // For now, we'll use a simple API key check
  // In production, you'd want proper JWT authentication
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  
  next();
};

module.exports = adminAuth; 