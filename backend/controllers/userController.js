const User = require('../models/userModel');
const Event = require('../models/eventModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'your_secret_key';

// Afficher la page de connexion
const getLoginPage = (req, res) => {
  try {
    res.render('user/login', {
      error: null,
      user: null
    });
  } catch (error) {
    console.error('Erreur lors du rendu de la page de connexion:', error);
    res.status(500).render('error', {
      message: 'Erreur lors du chargement de la page de connexion',
      user: null
    });
  }
};

// Afficher la page d'inscription
const getRegisterPage = (req, res) => {
  try {
    res.render('user/register', {
      error: null,
      user: null
    });
  } catch (error) {
    console.error('Erreur lors du rendu de la page d\'inscription:', error);
    res.status(500).render('error', {
      message: 'Erreur lors du chargement de la page d\'inscription',
      user: null
    });
  }
};

// Connexion utilisateur
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('user/login', {
        error: 'Email ou mot de passe incorrect',
        user: null
      });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('user/login', {
        error: 'Email ou mot de passe incorrect',
        user: null
      });
    }

    // Créer le token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        role: 'user'
      },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    // Stocker le token dans un cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 heures
    });

    // Redirection vers la page de profil
    res.redirect('/user/profile');
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.render('user/login', {
      error: 'Une erreur est survenue lors de la connexion',
      user: null
    });
  }
};

// Inscription utilisateur
const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      return res.render('user/register', {
        error: 'Les mots de passe ne correspondent pas',
        user: null
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('user/register', {
        error: 'Cet email est déjà utilisé',
        user: null
      });
    }

    // Créer le nouvel utilisateur
    const user = await User.create({
      username,
      email,
      password // Le hash sera fait par le middleware du modèle
    });

    // Créer le token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        role: 'user'
      },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    // Stocker le token dans un cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    // Redirection vers la page de profil
    res.redirect('/user/profile');
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    res.render('user/register', {
      error: 'Une erreur est survenue lors de l\'inscription',
      user: null
    });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const currentDate = new Date();
    
    console.log('Date actuelle:', currentDate);
    
    // Récupérer les événements auxquels l'utilisateur est inscrit
    const allEvents = await Event.find({ 
      participants: req.user.id,
      status: 'approved'
    }).populate('organizer', 'organizationName');
    
    // Filtrer pour ne garder que les événements à venir
    const upcomingEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      console.log(`Événement: ${event.title}, Date: ${eventDate}, Est à venir: ${eventDate >= currentDate}`);
      return eventDate >= currentDate;
    });

    res.render('user/profile', {
      user: user,
      events: upcomingEvents || [], // N'afficher que les événements à venir sur la page de profil
      error: null
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).render('error', {
      message: 'Erreur lors de la récupération du profil',
      user: req.user
    });
  }
};

const updateParticipationStatuses = async () => {
  try {
    const currentDate = new Date();
    
    console.log('Mise à jour des statuts des événements: Date actuelle =', currentDate);

    
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des statuts:', error);
    return false;
  }
};

// Obtenir l'historique des événements
const getUserEventHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDate = new Date();
    
    console.log('Récupération de l\'historique pour l\'utilisateur ID:', userId);
    console.log('Date actuelle:', currentDate);

    // Récupérer tous les événements approuvés
    const events = await Event.find({
      status: 'approved'
    }).populate('organizer', 'organizationName');
    
    // Filtrer pour ne garder que les événements où l'utilisateur est participant
    // Note: supposant que 'participants' est un champ dans Event qui contient les IDs des utilisateurs
    const userEvents = events.filter(event => {
      return event.participants && 
             event.participants.some(participantId => 
               participantId.toString() === userId.toString()
             );
    });
    
    console.log('Nombre total d\'événements trouvés pour l\'utilisateur:', userEvents.length);
    
    // Séparer les événements à venir et passés
    const upcomingEvents = userEvents.filter(event => {
      const eventDate = new Date(event.date);
      const isPast = eventDate < currentDate;
      console.log(`Événement: ${event.title}, Date: ${eventDate}, Est passé: ${isPast ? 'OUI' : 'NON'}`);
      return !isPast;
    });
    
    const pastEvents = userEvents.filter(event => {
      return new Date(event.date) < currentDate;
    });
    
    console.log('Nombre d\'événements à venir:', upcomingEvents.length);
    console.log('Nombre d\'événements passés:', pastEvents.length);

    res.render('user/eventHistory', {
      upcomingEvents,
      pastEvents,
      user: req.user
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    res.status(500).render('error', {
      message: 'Erreur lors de la récupération de l\'historique',
      user: req.user
    });
  }
};

// S'inscrire à un événement
const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    // Vérifier si l'événement existe et est approuvé
    const event = await Event.findOne({
      _id: eventId,
      status: 'approved'
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Événement non trouvé ou non approuvé'
      });
    }

    // Vérifier si l'utilisateur est déjà inscrit
    if (event.participants.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Vous êtes déjà inscrit à cet événement'
      });
    }

    // Vérifier si l'événement n'est pas complet
    if (event.participants.length >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Désolé, l\'événement est complet'
      });
    }

    // Ajouter l'utilisateur aux participants
    event.participants.push(userId);
    await event.save();

    res.status(200).json({
      success: true,
      message: 'Inscription réussie'
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription à l\'événement'
    });
  }
};

// Mettre à jour le profil utilisateur
const updateUserProfile = async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    
    // Vérifier si l'email existe déjà pour un autre utilisateur
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Cet email est déjà utilisé'
        });
      }
    }

    // Si un nouveau mot de passe est fourni
    if (newPassword) {
      // Vérifier l'ancien mot de passe
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Mot de passe actuel incorrect'
        });
      }
      // Hasher le nouveau mot de passe
      user.password = await bcrypt.hash(newPassword, 12);
    }

    // Mettre à jour les autres champs
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil'
    });
  }
};

// Exporter toutes les fonctions
module.exports = {
    getLoginPage,
    getRegisterPage,
    login,
    register,
    getUserProfile,
    getUserEventHistory,
    registerForEvent,
    updateUserProfile,
    updateParticipationStatuses
};