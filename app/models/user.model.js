// user.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

module.exports = User;
