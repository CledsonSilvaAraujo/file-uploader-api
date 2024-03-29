const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('products', {
  name: DataTypes.STRING,
  imageUrl: DataTypes.STRING
});

module.exports = Product;
