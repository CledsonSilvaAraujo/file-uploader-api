// productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

router.get('/', authMiddleware, async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body;
  const product = await Product.create({ name });
  res.json(product);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await Product.update({ name }, { where: { id } });
  res.json({ message: 'Product updated successfully' });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
