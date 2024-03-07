// productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const authMiddleware = require('../middleware/authJwt');

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
