// uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/product.model');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  const imageUrl = req.file.path; // Caminho do arquivo no servidor
  const { productId } = req.body;

  const product = await Product.findByPk(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  product.imageUrl = imageUrl;
  await product.save();

  res.json({ imageUrl });
});

module.exports = router;
