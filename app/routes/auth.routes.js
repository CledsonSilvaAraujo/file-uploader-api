// authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username, password } });

  if (user) {
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const newUser = await User.create({ username, email, password });
  
      const token = jwt.sign({ userId: newUser.id }, 'your_secret_key', { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/profile', authMiddleware, async (req, res) => {
    try {
      if (req.userId !== parseInt(req.query.userId)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      const { username, password } = req.body;
  
      const user = await User.findByPk(req.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (username) {
        user.username = username;
      }
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      await user.save();
  
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/find-by-email', authMiddleware, async (req, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const { email } = req.query;
  
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error finding user by email:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.delete('/profile', authMiddleware, async (req, res) => {
    try {
      if (req.userId !== parseInt(req.query.userId)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      await User.destroy({ where: { id: req.userId } });
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/all-users', authMiddleware, async (req, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const users = await User.findAll({ attributes: ['name', 'email'] });
  
      res.json(users);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;
