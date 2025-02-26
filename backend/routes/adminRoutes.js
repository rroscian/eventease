const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');
const adminController = require('../controllers/adminController');
const moderationController = require('../controllers/moderationController');

// Route de configuration admin
router.get('/setup', async (req, res) => {
  try {
    console.log('Modèle Admin:', typeof Admin); // Pour débogage
    
    // Vérifier si un admin existe déjà
    const adminCount = await Admin.countDocuments();
    
    if (adminCount > 0) {
      return res.send('Un administrateur existe déjà dans la base de données');
    }
    
    // Créer un nouvel admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@example.com',
      password: 'password123'
    });
    
    await admin.save();
    res.send(`
      <h1>Compte administrateur créé avec succès</h1>
      <p><strong>Email:</strong> admin@example.com</p>
      <p><strong>Mot de passe:</strong> password123</p>
      <p><strong>IMPORTANT:</strong> Changez ce mot de passe après la première connexion!</p>
      <p><a href="/admin/login">Se connecter maintenant</a></p>
    `);
  } catch (error) {
    console.error('Erreur lors de la création de l\'administrateur:', error);
    res.status(500).send(`Erreur: ${error.message}`);
  }
});

router.get('/login', (req, res) => {
    res.render('admin/adminLogin'); // Assurez-vous que ce chemin correspond à votre structure de dossiers
  });

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.render('admin/adminLogin', { error: 'Email ou mot de passe incorrect' });
      }
      
      // Si vous avez une méthode comparePassword dans votre modèle admin
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.render('admin/adminLogin', { error: 'Email ou mot de passe incorrect' });
      }
      
      // Créer un token JWT
      const token = jwt.sign(
        { id: admin._id, username: admin.username, role: 'admin' },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '24h' }
      );
      
      // Stocker le token dans un cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
      });
      
      // Rediriger vers le tableau de bord admin
      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error('Erreur lors de la connexion admin:', error);
      res.render('admin/adminLogin', { error: 'Une erreur est survenue' });
    }
  });
  router.get('/dashboard', protect, isAdmin, (req, res) => {
    try {
      // Vérifiez si l'utilisateur est connecté et est un admin
      if (!req.user || req.user.role !== 'admin') {
        return res.redirect('/admin/login');
      }
      
      // Vous pouvez récupérer des données pour le tableau de bord ici
      res.render('admin/dashboard', {
        user: req.user,
        stats: {
          // Exemple de statistiques que vous pourriez vouloir afficher
          pendingEventsCount: 0, // À remplacer par le vrai nombre
          totalEventsCount: 0,   // À remplacer par le vrai nombre
          totalOrganizersCount: 0 // À remplacer par le vrai nombre
        }
      });
    } catch (error) {
      console.error('Erreur lors du chargement du tableau de bord:', error);
      res.status(500).render('error', { message: 'Une erreur est survenue' });
    }
  });
  // Routes de modération
router.get('/moderation/pending', protect, isAdmin, moderationController.getPendingEvents);
router.post('/moderation/approve/:eventId', protect, isAdmin, moderationController.approveEvent);
router.post('/moderation/reject/:eventId', protect, isAdmin, moderationController.rejectEvent);
module.exports = router;