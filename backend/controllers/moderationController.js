const Event = require('../models/eventModel');

// Récupérer les événements en attente
exports.getPendingEvents = async (req, res) => {
  try {
    const pendingEvents = await Event.find({ status: 'pending' })
      .populate('organizer', 'username organizationName email')
      .sort({ createdAt: -1 });

    res.render('admin/pendingEvents', {
      events: pendingEvents,
      user: req.user
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).render('error', { message: 'Une erreur est survenue' });
  }
};

// Approuver un événement
exports.approveEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { 
        status: 'approved',
        adminFeedback: req.body.feedback || 'Événement approuvé'
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: 'Événement non trouvé' });
    }

    // Ici, vous pourriez ajouter l'envoi de notifications aux utilisateurs

    // Rediriger vers la liste des événements en attente
    res.redirect('/admin/moderation/pending');
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue' });
  }
};

// Rejeter un événement
exports.rejectEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    
    if (!req.body.feedback) {
      return res.status(400).json({ 
        success: false, 
        message: 'Un feedback est requis pour expliquer le rejet' 
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { 
        status: 'rejected',
        adminFeedback: req.body.feedback
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: 'Événement non trouvé' });
    }

    // Rediriger vers la liste des événements en attente
    res.redirect('/admin/moderation/pending');
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue' });
  }
};