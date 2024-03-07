// index.js
const express = require('express');
const sequelize = require('./app/config/database');
const authRoutes = require('./app/routes/auth.routes');
const productRoutes = require('./app/routes/product.routes');
const uploadRoutes = require('./app/routes/upload.routes');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/upload', uploadRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
