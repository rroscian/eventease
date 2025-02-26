const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const SECRET_KEY = 'your_secret_key';

const getRegisterPage = (req, res) => {
  res.render('user/register');  // Affiche la vue d'inscription (à adapter selon ta structure)
};

const getLoginPage = (req, res) => {
  res.render('user/login');  // Utilise la vue login du dossier user
};

// Fonction pour gérer l'inscription
const register = async (req, res) => {
  try {
    // Validation express-validator (voir authRoutes.js)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation échouée', 
        errors: errors.array() 
      });
    }

    const { username, email, password, confirmPassword } = req.body;

    // Debug log
    console.log('Tentative d\'inscription pour:', username, email);

    // Vérification si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Vérification si le nom d'utilisateur existe déjà
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà utilisé.' });
    }

    // Vérification si les mots de passe correspondent
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
    }

    // Création de l'utilisateur (le hachage sera fait par le middleware pre('save'))
    const newUser = new User({
      username,
      email,
      password // Le middleware pre('save') s'occupera du hachage
    });

    // Sauvegarde de l'utilisateur dans la base de données
    await newUser.save();

    // Création du token JWT pour connexion automatique avec durée plus courte
    const token = jwt.sign(
      { 
        id: newUser._id,
        username: newUser.username,
        role: 'user'
      },
      SECRET_KEY,
      { expiresIn: '12h' } // Réduit à 12h pour plus de sécurité
    );

    // Stockage du token dans un cookie sécurisé
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 12 * 60 * 60 * 1000, // 12 heures
      sameSite: 'strict' // Protection CSRF
    });

    // Redirection vers la page d'accueil avec les données utilisateur
    res.render('index', {
      user: {
        username: newUser.username,
        role: 'user'
      }
    });

  } catch (err) {
    console.error('Erreur d\'inscription:', err);
    res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      { 
        id: user._id,
        username: user.username,
        role: 'admin'
      },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.render('admin/index', {
      user: {
        username: user.username,
        role: 'admin'
      }
    });
  } catch (err) {
    console.error('Erreur de connexion admin:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    // Validation express-validator (voir authRoutes.js)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation échouée', 
        errors: errors.array() 
      });
    }

    const { username, password } = req.body;

    // Debug log
    console.log('Tentative de connexion pour:', username);

    const user = await User.findOne({ username });
    if (!user) {
      console.log('Utilisateur non trouvé');
      // Message générique de sécurité (ne pas révéler que l'utilisateur n'existe pas)
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Debug log
    console.log('Utilisateur trouvé:', user.username);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Mot de passe invalide');
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Debug log
    console.log('Mot de passe correct, création du token');

    // Création du token JWT
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role,
        username: user.username
      }, 
      SECRET_KEY, 
      { expiresIn: '12h' } // Réduit à 12h pour plus de sécurité
    );

    // Stockage du token dans un cookie sécurisé
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 12 * 60 * 60 * 1000, // 12 heures
      sameSite: 'strict' // Protection CSRF
    });

    // Debug log
    console.log('Token créé et stocké dans le cookie');

    // Redirection vers index avec les données utilisateur
    res.render('index', {
      user: {
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Erreur de connexion:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Déconnexion
const logout = (req, res) => {
  // Suppression du cookie contenant le token
  res.clearCookie('token');
  
  // Redirection vers la page d'accueil
  res.redirect('/');
};

// Profil utilisateur
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');

    res.render('user/profile', {
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};


module.exports = { 
  getRegisterPage, 
  register, 
  getUserProfile, 
  login, 
  getLoginPage, 
  logout,
  adminLogin 
};