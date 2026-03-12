const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token.split(" ")[1], jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded; // This contains the user's role and service_type
    next();
  });
};

module.exports = { verifyToken };