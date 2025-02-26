
const cron = require('node-cron');
const notificationService = require('../services/notificationService');

/**
 * Initialise tous les services liés aux notifications
 */
function initializeNotificationSystem() {
  console.log('Initialisation du système de notification...');
  
  // Planifier la vérification des événements à venir
  // Exécution tous les jours à 8h du matin
  cron.schedule('0 8 * * *', async () => {
    console.log('Exécution de la vérification planifiée des événements à venir');
    await notificationService.checkUpcomingEvents();
  });
  
  // Exécuter une première vérification au démarrage de l'application
  setTimeout(async () => {
    console.log('Exécution de la vérification initiale des événements à venir');
    await notificationService.checkUpcomingEvents();
  }, 5000); // Attendre 5 secondes après le démarrage
  
  console.log('Système de notification initialisé');
}

module.exports = { initializeNotificationSystem };