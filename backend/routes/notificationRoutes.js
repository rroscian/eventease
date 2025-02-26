const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');
const notificationController = require('../controllers/notificationController');

// Toutes les routes de notifications nécessitent une authentification
router.use(protect);

// Route pour afficher toutes les notifications de l'utilisateur
router.get('/', notificationController.getUserNotifications);

// Route pour obtenir le nombre de notifications non lues (pour AJAX)
router.get('/unread-count', notificationController.getUnreadCount);

// Route pour marquer une notification comme lue
router.post('/:id/read', notificationController.markAsRead);

// Route pour marquer toutes les notifications comme lues
router.post('/mark-all-read', notificationController.markAllAsRead);

// Route pour supprimer une notification
router.delete('/:id', notificationController.deleteNotification);

// Route de test des notifications pour événements à venir (uniquement pour les admins)
router.get('/test-upcoming', protect, isAdmin, notificationController.testUpcomingNotifications);

module.exports = router;