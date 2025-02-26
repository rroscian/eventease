const express = require('express');
const eventController = require('../controllers/eventController');
const reservationController = require('../controllers/reservationController');
const { protect, isOrganizer } = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes publiques (sans authentification)
router.get('/all', eventController.getAllEvents);
router.get('/recent', eventController.getRecentEvents);
router.get('/:id', eventController.getEventDetails);

// Routes pour les organisateurs (protégées)
router.get('/organizer/create', protect, isOrganizer, eventController.getCreateEventPage);
router.post('/organizer/create', protect, isOrganizer, eventController.createEvent);
router.get('/organizer/edit/:id', protect, isOrganizer, eventController.getEditEventPage);
router.get('/organizer', protect, isOrganizer, eventController.getOrganizerEvents);
router.get('/organizer/:id', protect, isOrganizer, eventController.getEventById);
router.put('/organizer/:id', protect, isOrganizer, eventController.updateEvent);
router.delete('/organizer/:id', protect, isOrganizer, eventController.deleteEvent);

// Route de réservation (nécessite une authentification mais pas d'être organisateur)
router.post('/reservations/:eventId', protect, reservationController.createReservation);

module.exports = router;