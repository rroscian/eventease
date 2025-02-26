const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  addFavorite,
  removeFavorite,
  getUserFavorites
} = require('../controllers/favoriteController');

router.use(protect); // Toutes les routes de favoris nécessitent une authentification

router.post('/', addFavorite);
router.delete('/:eventId', removeFavorite);
router.get('/me', getUserFavorites);

module.exports = router;