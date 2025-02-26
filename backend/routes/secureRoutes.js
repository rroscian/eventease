const express = require('express');
const { verifyToken, isOrganizer, isUser } = require('../middlewares/authMiddleware');

const router = express.Router();

// Accessible uniquement par les utilisateurs
router.get('/user/dashboard', verifyToken, isUser, (req, res) => {
  res.send('Welcome to the user dashboard');
});

// Accessible uniquement par les organisateurs
router.get('/organizer/dashboard', verifyToken, isOrganizer, (req, res) => {
  res.send('Welcome to the organizer dashboard');
});

module.exports = router;
