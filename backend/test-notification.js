// test-notification.js
const mongoose = require('./config/db');
const Notification = require('./models/notificationModel');

// Fonction pour créer une notification test
async function createTestNotification() {
  try {
    // Remplacez ces valeurs par les IDs que vous avez récupérés
    const userId = '67bcd2017bab0f1f01009254';  // Remplacez par un vrai ID d'utilisateur
    const eventId = '67bca4b43bd4e6945a049027';  // Remplacez par un vrai ID d'événement
    
    // Création de la notification
    const notification = new Notification({
      user: userId,
      title: 'Rappel : Événement à venir',
      message: 'L\'événement approche! N\'oubliez pas votre réservation dans 3 jours.',
      type: 'upcomingEvent',
      event: eventId,
      read: false,
      createdAt: new Date()
    });
    
    // Sauvegarde de la notification dans la base de données
    await notification.save();
    
    console.log('Notification de test créée avec succès!');
    console.log('ID de la notification:', notification._id);
    console.log('Détails:', notification);
  } catch (error) {
    console.error('Erreur lors de la création de la notification:', error);
  } finally {
    // Fermeture de la connexion à la base de données
    await mongoose.connection.close();
    console.log('Connexion à la base de données fermée.');
  }
}

// Exécution de la fonction
createTestNotification();