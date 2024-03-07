require('dotenv').config()
module.exports = {
  secret: process.env.JWT_SECRET_KEY,   
  jwtExpiration: 120,         
  jwtRefreshExpiration: 190,  
};