require('dotenv').config()
module.exports = {
  secret: process.env.JWT_SECRET_KEY,   
  // jwtExpiration: 3600,           // 1 hour
  // jwtRefreshExpiration: 86400,   // 24 hours

  /* for test */
  jwtExpiration: 120,          // 1 minute
  jwtRefreshExpiration: 190,  // 2 minutes
};