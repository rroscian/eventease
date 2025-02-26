const express = require('express');
const authController = require('../controllers/authController');
const { protect, loginLimiter } = require('../middlewares/authMiddleware');
const router = express.Router();
const { body } = require('express-validator');

const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 }).withMessage('Le nom d\'utilisateur doit contenir entre 3 et 20 caractères')
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Le nom d\'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores'),
  
  body('email')
    .trim()
    .isEmail().withMessage('Email invalide')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).withMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Les mots de passe ne correspondent pas');
      }
      return true;
    })
];

// Validation pour la connexion
const loginValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Le nom d\'utilisateur est requis'),
  
  body('password')
    .notEmpty().withMessage('Le mot de passe est requis')
];

// Routes pour l'inscription
router.get('/register', authController.getRegisterPage);
router.post('/register', registerValidation, authController.register);

// Routes pour la connexion
router.get('/login', authController.getLoginPage);
router.post('/login', loginValidation, loginLimiter, authController.login);

// Route de déconnexion
router.get('/logout', authController.logout);

// Route de profil - utiliser le controller au lieu d'une fonction anonyme
router.get('/profile', protect, authController.getUserProfile);

// Route de connexion admin
router.post('/admin/login',loginLimiter,  authController.adminLogin);

module.exports = router;