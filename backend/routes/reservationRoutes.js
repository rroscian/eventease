const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { protect } = require('../middlewares/authMiddleware');

// Routes protégées (utilisateur connecté)
router.use(protect);

// Créer une réservation
router.post('/event/:eventId', protect, reservationController.createReservation);

// Voir mes réservations
router.get('/my-reservations', protect, reservationController.getUserReservations);

// Vérifier un QR code
router.get('/verify/:qrCodeId', protect, reservationController.verifyQRCode);

module.exports = router;