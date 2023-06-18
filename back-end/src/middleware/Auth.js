const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/config')

const authentication = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
      console.log("kkkkkkkkkkkkkkkkk");
      return res.status(401).json({ message: 'Missing token' });
  }

  // Verify the token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach the decoded token to the request object
    req.user = decoded.user;
    next();
  });
};

module.exports = authentication;
