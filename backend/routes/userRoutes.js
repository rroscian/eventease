const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  getLoginPage,
  getRegisterPage,
  register,
  login,
  getUserProfile,
  getUserEventHistory,
  registerForEvent,
  updateUserProfile
} = require('../controllers/userController');

// Routes publiques
router.get('/login', getLoginPage);
router.post('/login', login);
router.get('/register', getRegisterPage);
router.post('/register', register);

// Routes protégées
router.get('/profile', protect, getUserProfile);
router.get('/events/history', protect, getUserEventHistory);
router.post('/events/:eventId/register', protect, registerForEvent);
router.put('/profile/update', protect, updateUserProfile);
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;