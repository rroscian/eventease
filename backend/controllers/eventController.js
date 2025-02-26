const Event = require('../models/eventModel');
const { notifyNewEvent } = require('../services/notificationService');

const getCreateEventPage = (req, res) => {
  try {
    console.log('User:', req.user); // Pour déboguer
    
    // Vérifiez si req.user est défini
    if (!req.user) {
      return res.redirect('/organizer/login');
    }
    
    // Utilisez le chemin complet vers la vue
    res.render('organizer/create', {
      user: req.user,
      infoMessage: "Votre événement sera soumis à validation par un administrateur avant d'être publié."
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).render('error', { 
      message: 'Une erreur est survenue lors du chargement de la page de création',
      user: req.user || null
    });
  }
};
// Créer un nouvel événement
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      date,
      location,
      category,
      price // Assurez-vous de récupérer le prix s'il est dans le formulaire
    } = req.body;

    // Création de l'événement avec statut 'pending' par défaut
    const newEvent = new Event({
      title,
      description,
      image,
      date,
      location,
      category,
      price: price || 0, // Valeur par défaut si non fournie
      organizer: req.user.id,  // ID de l'organisateur connecté
      status: 'pending'  // Tous les événements sont en attente de validation par défaut
    });

    // Sauvegarde de l'événement
    await newEvent.save();

    // Les notifications seront gérées plus tard, lors de l'approbation de l'événement
    // Nous ne les envoyons pas ici car l'événement est en attente

    // Redirection avec message de succès
    req.session.successMessage = 'Événement créé avec succès. Il sera visible après validation par un administrateur.';
    res.redirect('/organizer/profile');
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    
    // En cas d'erreur, réafficher le formulaire avec les données et le message d'erreur
    res.render('createEvent', {
      user: req.user,
      error: 'Une erreur est survenue lors de la création de l\'événement',
      event: req.body, // Pour conserver les données du formulaire
      infoMessage: "Votre événement sera soumis à validation par un administrateur avant d'être publié."
    });
  }
};

// Obtenir tous les événements d'un organisateur
const getOrganizerEvents = async (req, res) => {
  try {
    // Récupérer tous les événements de l'organisateur, quel que soit leur statut
    const events = await Event.find({ organizer: req.user.id })
                             .sort({ date: 'asc' });
    
    res.render('organizerEvents', { 
      events, 
      user: req.user,
      successMessage: req.session.successMessage 
    });
    
    // Effacer le message après l'avoir affiché
    req.session.successMessage = null;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).render('error', { message: 'Erreur lors de la récupération des événements' });
  }
};

// Obtenir les événements pour l'API (uniquement les approuvés)
const getEvent = async (req, res) => {
  try {
    const events = await Event.find({ status: 'approved' })
      .populate('organizer', 'username organizationName')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mettre à jour un événement
const updateEvent = async (req, res) => {
  try {
    const { title, description, image, location, category, date, price } = req.body;
    
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    // Vérifier si l'organisateur est propriétaire de l'événement
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    // Mise à jour de l'événement - remet le statut à "pending" pour revalidation
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        description, 
        image, 
        location, 
        category, 
        date, 
        price,
        status: 'pending', // Repasse en mode attente de validation
        adminFeedback: '' // Efface les anciens commentaires
      },
      { new: true }
    );

    req.session.successMessage = 'Événement mis à jour avec succès. Il doit être validé à nouveau par un administrateur.';
    res.redirect('/organizer/profile');
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'événement:', error);
    res.status(500).render('error', { message: 'Erreur lors de la mise à jour de l\'événement' });
  }
};

// Supprimer un événement
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    // Vérifier si l'organisateur est propriétaire de l'événement
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    await Event.findByIdAndDelete(req.params.id);
    
    req.session.successMessage = 'Événement supprimé avec succès.';
    res.redirect('/organizer/profile');
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    res.status(500).render('error', { message: 'Erreur lors de la suppression de l\'événement' });
  }
};

// Obtenir les détails d'un événement spécifique
const getEventById = async (req, res) => {
  try {
    // Pour les organisateurs, ils peuvent voir tous leurs événements
    const event = await Event.findOne({
      _id: req.params.id,
      organizer: req.user.id
    }).populate('organizer', 'username email organizationName');

    if (!event) {
      return res.status(404).render('error', {
        message: 'Événement non trouvé ou vous n\'êtes pas autorisé à y accéder'
      });
    }

    res.render('eventDetails', {
      event,
      user: req.user,
      isOwner: true
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'événement:', error);
    res.status(500).render('error', { message: 'Une erreur est survenue' });
  }
};

// Obtenir tous les événements (uniquement les approuvés)
const getAllEvents = async (req, res) => {
  try {
    // Récupérer uniquement les événements approuvés
    const events = await Event.find({ status: 'approved' })
      .populate('organizer', 'username organizationName')
      .sort({ date: 1 });
    
    // Changez 'allEvents' en 'events' pour correspondre à votre template
    res.render('events', {
      events,
      user: req.user || null
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).render('error', { 
      message: 'Une erreur est survenue lors de la récupération des événements' 
    });
  }
};

const getEventDetails = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Pour le public, seulement les événements approuvés sont visibles
    const event = await Event.findOne({ 
      _id: eventId,
      status: 'approved' 
    }).populate('organizer', 'username organizationName');
    
    if (!event) {
      return res.status(404).render('error', { 
        message: 'Événement non trouvé ou non approuvé',
        user: req.user || null 
      });
    }
    
    // Vérifier si l'utilisateur est propriétaire de l'événement
    const isOwner = req.user && 
      event.organizer && 
      req.user.id === event.organizer._id.toString();
    
    res.render('eventDetails', {
      event,
      user: req.user || null,
      isOwner: isOwner
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'événement:', error);
    res.status(500).render('error', { 
      message: 'Une erreur est survenue',
      user: req.user || null 
    });
  }
};
// Obtenir les événements récents pour la page d'accueil
const getRecentEvents = async (req, res) => {
  try {
    // Récupérer uniquement les événements approuvés pour l'affichage public
    const events = await Event.find({ status: 'approved' })
      .populate('organizer', 'organizationName username')
      .sort({ date: 1 }) // Événements à venir d'abord
      .limit(10);

    res.render('index', {
      user: req.user,
      events: events
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des événements récents:', error);
    res.render('index', {
      user: req.user,
      events: [],
      error: 'Erreur lors de la récupération des événements'
    });
  }
};

// Obtenir la page d'édition d'un événement
const getEditEventPage = async (req, res) => {
  try {
    const eventId = req.params.id;
    
    // Rechercher l'événement avec l'ID spécifié
    const event = await Event.findOne({ 
      _id: eventId,
      organizer: req.user.id // Vérifier que l'événement appartient à l'organisateur connecté
    });

    if (!event) {
      return res.status(404).render('error', { 
        message: 'Événement non trouvé ou vous n\'êtes pas autorisé à le modifier' 
      });
    }

    // Afficher la page d'édition avec les données de l'événement
    res.render('editEvent', { 
      event,
      user: req.user,
      statusMessage: event.status === 'pending' ? 'Cet événement est en attente de validation.' :
                     event.status === 'rejected' ? `Cet événement a été rejeté. Motif: ${event.adminFeedback}` :
                     'Cet événement est approuvé et visible par tous.'
    });
  } catch (error) {
    console.error('Erreur lors du chargement de la page d\'édition:', error);
    res.status(500).render('error', { 
      message: 'Une erreur est survenue lors du chargement de la page d\'édition' 
    });
  }
};

module.exports = {
  getCreateEventPage,
  createEvent,
  getOrganizerEvents,
  getEvent,
  getEditEventPage,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getRecentEvents,
  getEventDetails
};