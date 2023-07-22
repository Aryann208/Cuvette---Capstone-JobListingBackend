const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function jwtAuthMiddleware(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid Token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = jwtAuthMiddleware;
