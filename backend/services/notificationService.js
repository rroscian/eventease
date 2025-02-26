const Notification = require('../models/notificationModel');
const User = require('../models/userModel');
const Event = require('../models/eventModel');
const Reservation = require('../models/reservationModel');
const cron = require('node-cron');

// Notification pour nouvel événement
exports.notifyNewEvent = async (event) => {
  try {
    // Trouver tous les utilisateurs qui suivent l'organisateur
    const followers = await User.find({
      followedOrganizers: event.organizer
    });

    // Créer une notification pour chaque follower
    const notifications = followers.map(follower => ({
      user: follower._id,
      title: 'Nouvel événement',
      message: `${event.organizer.organizationName || 'Un organisateur que vous suivez'} a créé un nouvel événement: ${event.title}`,
      type: 'newEvent',
      event: event._id
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
      console.log(`${notifications.length} notifications envoyées pour le nouvel événement: ${event.title}`);
    }
  } catch (error) {
    console.error('Erreur notification nouvel événement:', error);
  }
};

// Notification pour événement à venir
exports.checkUpcomingEvents = async () => {
  try {
    console.log('Vérification des événements à venir...');
    
    // Rechercher les réservations pour les événements qui auront lieu dans 3 jours et qui n'ont pas encore été notifiées
    const threeDaysFromNow = new Date();
    const today = new Date();
    
    // Définir la plage de temps pour "dans 3 jours"
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    threeDaysFromNow.setHours(23, 59, 59, 999); // Fin de la journée
    
    today.setHours(0, 0, 0, 0); // Début de la journée
    
    // Rechercher les événements qui auront lieu dans 3 jours
    const upcomingEvents = await Event.find({
      date: {
        $gte: threeDaysFromNow,
        $lt: new Date(threeDaysFromNow.getTime() + 24 * 60 * 60 * 1000) // +1 jour
      },
      status: 'approved' // Uniquement les événements approuvés
    }).populate('organizer', 'organizationName');
    
    console.log(`Trouvé ${upcomingEvents.length} événements qui auront lieu dans 3 jours`);
    
    // Pour chaque événement, rechercher les réservations
    for (const event of upcomingEvents) {
      const reservations = await Reservation.find({
        event: event._id,
        notified3DaysBefore: { $ne: true } // Uniquement celles qui n'ont pas été notifiées
      });
      
      console.log(`Événement ${event.title} : ${reservations.length} réservations à notifier`);
      
      // Créer une notification pour chaque utilisateur
      const notifications = [];
      
      for (const reservation of reservations) {
        notifications.push({
          user: reservation.user,
          title: 'Rappel : Événement à venir',
          message: `L'événement "${event.title}" aura lieu dans 3 jours. N'oubliez pas votre réservation !`,
          type: 'upcomingEvent',
          event: event._id
        });
        
        // Marquer la réservation comme notifiée
        reservation.notified3DaysBefore = true;
        await reservation.save();
      }
      
      if (notifications.length > 0) {
        await Notification.insertMany(notifications);
        console.log(`${notifications.length} notifications envoyées pour l'événement: ${event.title}`);
      }
    }
    
    // Faire de même pour les événements qui auront lieu demain
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Début de la journée
    
    const tomorrowEnd = new Date(tomorrow);
    tomorrowEnd.setHours(23, 59, 59, 999); // Fin de la journée
    
    const tomorrowEvents = await Event.find({
      date: {
        $gte: tomorrow,
        $lte: tomorrowEnd
      },
      status: 'approved'
    }).populate('organizer', 'organizationName');
    
    console.log(`Trouvé ${tomorrowEvents.length} événements qui auront lieu demain`);
    
    for (const event of tomorrowEvents) {
      const reservations = await Reservation.find({
        event: event._id,
        notified1DayBefore: { $ne: true } // Uniquement celles qui n'ont pas été notifiées
      });
      
      console.log(`Événement ${event.title} : ${reservations.length} réservations à notifier (J-1)`);
      
      const notifications = [];
      
      for (const reservation of reservations) {
        notifications.push({
          user: reservation.user,
          title: 'DEMAIN : Votre événement',
          message: `Rappel : L'événement "${event.title}" a lieu DEMAIN à ${new Date(event.date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}. Préparez votre QR code !`,
          type: 'upcomingEvent',
          event: event._id
        });
        
        // Marquer la réservation comme notifiée
        reservation.notified1DayBefore = true;
        await reservation.save();
      }
      
      if (notifications.length > 0) {
        await Notification.insertMany(notifications);
        console.log(`${notifications.length} notifications J-1 envoyées pour l'événement: ${event.title}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification des événements à venir:', error);
    return false;
  }
};

// Marquer une notification comme lue
exports.markAsRead = async (notificationId, userId) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { read: true },
      { new: true }
    );
    
    return notification;
  } catch (error) {
    console.error('Erreur lors du marquage de la notification comme lue:', error);
    throw error;
  }
};

// Récupérer les notifications d'un utilisateur
exports.getUserNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({ user: userId })
      .populate('event')
      .sort('-createdAt');
    
    return notifications;
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error);
    throw error;
  }
};

// Planifier la vérification quotidienne des événements à venir (à 8h du matin)
cron.schedule('0 8 * * *', () => {
  console.log('Exécution de la vérification des événements à venir (planifiée à 8h)');
  checkUpcomingEvents();
});

// Fonction pour les tests, décommenter pour tester
exports.testUpcomingEventsNotification = async () => {
  console.log('Test de notification des événements à venir');
  return await this.checkUpcomingEvents();
};