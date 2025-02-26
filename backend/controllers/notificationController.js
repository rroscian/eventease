const Notification = require('../models/notificationModel');
const notificationService = require('../services/notificationService');

// Obtenir les notifications de l'utilisateur connecté
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await notificationService.getUserNotifications(userId);

    // Compter les notifications non lues
    const unreadCount = notifications.filter(n => !n.read).length;

    // Renvoyer la vue avec les notifications
    res.render('user/notifications', {
      user: req.user,
      notifications,
      unreadCount
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error);
    res.status(500).render('error', {
      message: 'Une erreur est survenue lors de la récupération des notifications',
      user: req.user
    });
  }
};

// Récupérer le nombre de notifications non lues (pour la mise à jour en AJAX)
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const unreadCount = await Notification.countDocuments({ 
      user: userId,
      read: false
    });

    res.json({ unreadCount });
  } catch (error) {
    console.error('Erreur lors du comptage des notifications non lues:', error);
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};

// Marquer une notification comme lue
exports.markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;

    await notificationService.markAsRead(notificationId, userId);

    // Si la requête est AJAX, renvoyer une réponse JSON
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json({ success: true });
    }

    // Sinon, rediriger vers la page des notifications
    res.redirect('/notifications');
  } catch (error) {
    console.error('Erreur lors du marquage de la notification:', error);
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(500).json({ error: 'Une erreur est survenue' });
    }
    
    res.status(500).render('error', {
      message: 'Une erreur est survenue',
      user: req.user
    });
  }
};

// Marquer toutes les notifications comme lues
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    
    await Notification.updateMany(
      { user: userId, read: false },
      { read: true }
    );
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json({ success: true });
    }
    
    res.redirect('/notifications');
  } catch (error) {
    console.error('Erreur lors du marquage de toutes les notifications:', error);
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(500).json({ error: 'Une erreur est survenue' });
    }
    
    res.status(500).render('error', {
      message: 'Une erreur est survenue',
      user: req.user
    });
  }
};

// Supprimer une notification
exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;
    
    await Notification.findOneAndDelete({
      _id: notificationId,
      user: userId
    });
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json({ success: true });
    }
    
    res.redirect('/notifications');
  } catch (error) {
    console.error('Erreur lors de la suppression de la notification:', error);
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(500).json({ error: 'Une erreur est survenue' });
    }
    
    res.status(500).render('error', {
      message: 'Une erreur est survenue',
      user: req.user
    });
  }
};

// Tester les notifications pour les événements à venir (uniquement pour le développement)
exports.testUpcomingNotifications = async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    
    const result = await notificationService.testUpcomingEventsNotification();
    
    res.json({
      success: true,
      message: 'Test de notification exécuté',
      result
    });
  } catch (error) {
    console.error('Erreur lors du test de notification:', error);
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};
exports.getRecentNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Récupérer les 5 notifications les plus récentes
    const notifications = await Notification.find({ user: userId })
      .sort('-createdAt')
      .limit(5)
      .populate('event', '_id title')
      .lean();  // Utiliser lean() pour des performances optimales
    
    res.json({
      success: true,
      notifications: notifications
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications récentes:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue'
    });
  }
};