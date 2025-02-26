const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route pour afficher le formulaire de contact
router.get('/', contactController.getContactForm);

// Route pour traiter l'envoi du formulaire
router.post('/', contactController.sendContactForm);

module.exports = router;