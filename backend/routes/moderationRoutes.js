const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware'); // Vérifiez que ce chemin est correct
const { isAdmin } = require('../middlewares/adminMiddleware');
const {
  getPendingEvents,
  approveEvent,
  rejectEvent
} = require('../controllers/moderationController');

// Middleware de protection global pour toutes les routes de modération
router.use(protect, isAdmin);

router.get('/pending', getPendingEvents);
router.put('/approve/:eventId', approveEvent);
router.put('/reject/:eventId', rejectEvent);

module.exports = router;