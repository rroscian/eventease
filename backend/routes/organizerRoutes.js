const express = require('express');
const organizerController = require('../controllers/organizerController');
const eventController = require('../controllers/eventController');
const { protect, isOrganizer } = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes pour l'inscription des organisateurs
router.get('/register', organizerController.getRegisterPage);
router.post('/register', organizerController.register);

// Routes pour la connexion des organisateurs
router.get('/login', organizerController.getLoginPage);
router.post('/login', organizerController.login);
router.get('/logout', protect, organizerController.logout);

// Routes pour le profil organisateur
router.get('/profile', protect, isOrganizer, organizerController.getOrganizerProfile);

// Routes pour la création et gestion des événements
router.get('/event/create', protect, isOrganizer, eventController.getCreateEventPage);
router.post('/event/create', protect, isOrganizer, eventController.createEvent);

// Routes pour les événements de l'organisateur (liste, modification, suppression)
router.get('/events', protect, isOrganizer, organizerController.getOrganizerEvents);
router.put('/events/:id', protect, isOrganizer, organizerController.updateEvent);
router.delete('/events/:id', protect, isOrganizer, organizerController.deleteEvent);

// Route pour le scanner QR
router.get('/scan', protect, isOrganizer, (req, res) => {
    res.render('qrScanner', { user: req.user });
});

module.exports = router;