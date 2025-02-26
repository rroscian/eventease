const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel'); // Vous devrez créer ce modèle
const Event = require('../models/eventModel');

// Afficher la page de connexion admin
exports.getLoginPage = (req, res) => {
  res.render('admin/adminLogin');
};

// Gérer la connexion admin
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.render('admin/adminLogin', { error: 'Identifiants invalides' });
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.render('admin/adminLogin', { error: 'Identifiants invalides' });
    }
    
    // Créer et stocker le token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: 'admin' },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1d' }
    );
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });
    
    // Rediriger vers le dashboard
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Erreur lors de la connexion admin:', error);
    res.render('admin/adminLogin', { error: 'Une erreur est survenue' });
  }
};

// Dashboard admin
exports.getDashboard = async (req, res) => {
    try {
      // Récupérer des statistiques
      const pendingCount = await Event.countDocuments({ status: 'pending' });
      const approvedCount = await Event.countDocuments({ status: 'approved' });
      const rejectedCount = await Event.countDocuments({ status: 'rejected' });
      
      // Récupérer les 5 derniers événements en attente
      const recentPendingEvents = await Event.find({ status: 'pending' })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('organizer', 'username organizationName');
      
      res.render('admin/dashboard', {
        user: req.user,
        stats: {
          pendingCount,
          approvedCount,
          rejectedCount,
          totalCount: pendingCount + approvedCount + rejectedCount
        },
        recentPendingEvents
      });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).render('error', { message: 'Une erreur est survenue' });
    }
  };

// Déconnexion admin
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/admin/login');
};