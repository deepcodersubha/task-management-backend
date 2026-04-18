const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // Token comes in header: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, unauthorized' });
  }

  const token = authHeader.split(' ')[1]; // extract token after "Bearer "

  try {
    // verify() throws if token is invalid or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next(); // move to the next handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = protect;