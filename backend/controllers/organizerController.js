const bcrypt = require('bcryptjs');
const Organizer = require('../models/organizerModel');
const Event = require('../models/eventModel');  // Déplacé ici
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

const getLoginPage = (req, res) => {
  try {
    res.render('organizer/login', { 
      error: null,
      user: req.user || null
    });
  } catch (error) {
    console.error('Erreur lors du rendu de la page de connexion:', error);
    res.status(500).render('error', {
      message: 'Erreur lors du chargement de la page de connexion',
      user: req.user || null
    });
  }
};

const getRegisterPage = (req, res) => {
  res.render('organizer/register');  
};

// Dans organizerController.js, modifiez la fonction login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Tentative de connexion pour:', email);

    const organizer = await Organizer.findOne({ email });
    if (!organizer) {
      console.log('Organisateur non trouvé');
      return res.render('organizer/login', { error: 'Organisateur non trouvé' });
    }

    const isMatch = await organizer.comparePassword(password);
    if (!isMatch) {
      console.log('Mot de passe invalide');
      return res.render('organizer/login', { error: 'Identifiants invalides' });
    }

    // Création du token
    const token = jwt.sign(
      { 
        id: organizer._id,
        username: organizer.username,
        role: 'organizer',
        organizationName: organizer.organizationName 
      }, 
      SECRET_KEY, 
      { expiresIn: '24h' }
    );

    // Stockage du token dans un cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    // Récupérer les événements de l'organisateur
    const events = await Event.find({ organizer: organizer._id })
      .sort({ createdAt: -1 });

      return res.render('organizer/profile', {
        username: organizer.username,
        email: organizer.email,
        organizationName: organizer.organizationName,
        user: {
          id: organizer._id,
          username: organizer.username,
          role: 'organizer',
          organizationName: organizer.organizationName
        },
        events: events
      });

  } catch (err) {
    console.error('Erreur de connexion:', err);
    return res.render('organizer/login', { error: 'Une erreur est survenue' });
  }
};



// Fonction pour gérer l'inscription des organisateurs
const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, organizationName } = req.body;

    // Validation des champs
    if (!username || !email || !password || !confirmPassword || !organizationName) {
      return res.status(400).send('Tous les champs sont obligatoires.');
    }

    // Vérification si l'email existe déjà
    const existingOrganizer = await Organizer.findOne({ email });
    if (existingOrganizer) {
      return res.status(400).send('Cet email est déjà utilisé.');
    }

    // Vérification si les mots de passe correspondent
    if (password !== confirmPassword) {
      return res.status(400).send('Les mots de passe ne correspondent pas.');
    }

    // Création de l'organisateur (le hashage sera fait automatiquement par le middleware)
    const newOrganizer = new Organizer({
      username,
      email,
      password, // Ne pas hasher ici, le middleware s'en chargera
      organizationName,
      role: 'organizer'
    });

    await newOrganizer.save();

    const token = jwt.sign(
      { userId: newOrganizer._id, role: 'organizer' },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Organisateur créé avec succès',
      token,
      organizer: {
        id: newOrganizer._id,
        username: newOrganizer.username,
        email: newOrganizer.email,
        organizationName: newOrganizer.organizationName
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).send('Erreur lors de l\'inscription de l\'organisateur');
  }
    };


    const getOrganizerProfile = async (req, res) => {
      try {
        const organizer = await Organizer.findById(req.user.id);
        if (!organizer) {
          return res.status(404).redirect('/organizer/login');
        }
    
        // Récupérer tous les événements de l'organisateur, quel que soit leur statut
        const events = await Event.find({ organizer: req.user.id })
          .sort({ date: -1 });
    
        // Changez 'profile' par 'organizer/profile' pour indiquer le sous-dossier
        res.render('organizer/profile', {
          username: organizer.username,
          email: organizer.email,
          role: organizer.role,
          organizationName: organizer.organizationName,
          events: events,
          user: req.user,
          successMessage: req.session.successMessage
        });
        
        // Effacer le message après l'avoir affiché
        req.session.successMessage = null;
      } catch (err) {
        console.error('Erreur:', err);
        res.status(500).redirect('/');
      }
    };

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const organizerId = req.user.id;

        // Vérifie si l'événement appartient à l'organisateur
        const event = await Event.findOne({ 
            _id: eventId, 
            organizer: organizerId 
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                error: 'Événement non trouvé ou non autorisé'
            });
        }

        // Mise à jour de l'événement
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updatedEvent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la mise à jour de lévénement'
        });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const organizerId = req.user.id;

        // Vérifie si l'événement appartient à l'organisateur
        const event = await Event.findOne({ 
            _id: eventId, 
            organizer: organizerId 
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                error: 'Événement non trouvé ou non autorisé'
            });
        }

        await event.remove();

        res.status(200).json({
            success: true,
            message: 'Événement supprimé avec succès'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la suppression de lévénement'
        });
    }
};
const getOrganizerEvents = async (req, res) => {
  try {
    // Récupérer tous les événements de l'organisateur, quel que soit leur statut
    const events = await Event.find({ organizer: req.user.id })
                            .sort({ date: 'asc' });
    
    // Spécifier le chemin complet vers la vue dans le sous-dossier "organizer"
    res.render('organizer/events', { 
      events, 
      user: req.user,
      successMessage: req.session.successMessage 
    });
    
    // Effacer le message après l'avoir affiché
    req.session.successMessage = null;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).render('error', { 
      message: 'Erreur lors de la récupération des événements',
      user: req.user || null 
    });
  }
};


// Déconnexion
const logout = (req, res) => {
  // Suppression du cookie contenant le token
  res.clearCookie('token');
  
  // Redirection vers la page d'accueil
  res.redirect('/');
};

module.exports = {
  getOrganizerProfile,
  login,
  getRegisterPage,
  getLoginPage,
  register,
  logout,
  getOrganizerEvents,
  updateEvent,
  deleteEvent
};