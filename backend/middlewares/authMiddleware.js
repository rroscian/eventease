// authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const Event = require('../models/eventModel');
const rateLimit = require('express-rate-limit');

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives max
  message: 'Trop de tentatives de connexion, veuillez réessayer après 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
  // Stocker les tentatives par username + IP pour plus de sécurité
  keyGenerator: (req) => {
    return `${req.ip}-${req.body.username || 'anonymous'}`;
  }
});


exports.protect = async (req, res, next) => {
  try {
    // Ne pas vérifier l'authentification pour les routes de login et register
    if (req.path.includes('/login') || req.path.includes('/register')) {
      return next();
    }

    const token = req.cookies.token;
    
    if (!token) {
      if (req.path.includes('/organizer')) {
        return res.redirect('/organizer/login');
      }
      return res.redirect('/auth/login');
    }

    // Amélioration de la vérification du token
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      // Vérifier si le token n'est pas expiré
      if (decoded.exp < Date.now() / 1000) {
        throw new Error('Token expiré');
      }
      req.user = decoded;
    } catch (error) {
      // Token invalide ou expiré
      res.clearCookie('token');
      if (req.path.includes('/organizer')) {
        return res.redirect('/organizer/login');
      }
      return res.redirect('/auth/login');
    }

    // Si c'est une route de profil, récupérer les événements
    if (req.path === '/profile') {
      const events = await Event.find()
        .populate('organizer')
        .sort({ date: 1 })
        .limit(10);
      req.events = events;
    }

    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    res.clearCookie('token');
    if (req.path.includes('/organizer')) {
      return res.redirect('/organizer/login');
    }
    res.redirect('/auth/login');
  }
};

exports.isOrganizer = (req, res, next) => {
  // Ne pas vérifier le rôle pour les routes de login et register
  if (req.path.includes('/login') || req.path.includes('/register')) {
    return next();
  }

  console.log('Vérification du rôle organisateur...');
  if (!req.user || req.user.role !== 'organizer') {
    console.log('Utilisateur non autorisé');
    return res.redirect('/organizer/login');
  }
  console.log('Rôle organisateur vérifié');
  next();
};