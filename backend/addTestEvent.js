const mongoose = require('mongoose');
const Event = require('./models/eventModel');
const User = require('./models/userModel');

// Connexion à MongoDB (ajustez l'URL selon votre configuration)
mongoose.connect('mongodb://localhost:27017/eventApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Fonction pour analyser le modèle et afficher les catégories valides
async function showValidCategories() {
  try {
    // Accéder au schéma pour voir les valeurs d'énumération autorisées
    if (Event.schema && Event.schema.path('category')) {
      const categoryEnum = Event.schema.path('category').enumValues;
      console.log('Valeurs valides pour la catégorie:', categoryEnum);
      return categoryEnum[0] || 'Autre'; // Retourne la première catégorie valide ou 'Autre'
    } else {
      console.log('Impossible de déterminer les catégories valides');
      return 'Autre'; // Valeur par défaut
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des catégories:', error);
    return 'Autre'; // Valeur par défaut en cas d'erreur
  }
}

async function addTestEvent() {
  try {
    // Obtenir une catégorie valide
    const validCategory = await showValidCategories();
    
    // Récupérer un utilisateur pour l'ajouter comme participant
    const user = await User.findOne({ email: 'arnaud.schmidt@outlook.fr' });
    
    if (!user) {
      console.log('Utilisateur non trouvé! Création impossible.');
      return;
    }

    // Récupérer un organisateur (si différent de l'utilisateur)
    // Dans cet exemple, nous utilisons le même utilisateur comme organisateur
    const organizer = user;
    
    console.log('Création d\'événements avec la catégorie:', validCategory);
    
    // Créer un événement à venir (date future)
    const upcomingEvent = new Event({
      title: 'Événement Test À Venir',
      description: 'Ceci est un événement de test à venir pour vérifier la fonctionnalité d\'historique',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours dans le futur
      location: 'Paris',
      category: validCategory,
      capacity: 50,
      image: '/images/default-event.jpg', // Ajustez selon votre structure
      status: 'approved',
      participants: [user._id],
      organizer: organizer._id
    });
    
    await upcomingEvent.save();
    console.log('Événement à venir créé avec succès!');
    
    // Créer un événement passé (date passée)
    const pastEvent = new Event({
      title: 'Événement Test Passé',
      description: 'Ceci est un événement de test passé pour vérifier la fonctionnalité d\'historique',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 jours dans le passé
      location: 'Lyon',
      category: validCategory,
      capacity: 50,
      image: '/images/default-event.jpg', // Ajustez selon votre structure
      status: 'approved',
      participants: [user._id],
      organizer: organizer._id
    });
    
    await pastEvent.save();
    console.log('Événement passé créé avec succès!');
    
    console.log('ID utilisateur ajouté aux événements:', user._id);
    
  } catch (error) {
    console.error('Erreur lors de la création des événements de test:', error);
  } finally {
    mongoose.disconnect();
  }
}

addTestEvent();