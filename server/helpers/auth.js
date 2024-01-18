const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

const comparePasswords = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

// authenticationMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    // Handle case where token is not present
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle case where token is invalid
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Set req.user based on the decoded token
    req.user = decoded;
    next();
  });
};


module.exports =  { hashPassword, comparePasswords, authenticateUser }