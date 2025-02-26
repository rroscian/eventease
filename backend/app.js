const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const mongoose = require('./config/db');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const path = require('path');
const eventController = require('./controllers/eventController');
const Event = require('./models/eventModel');
const reservationController = require('./controllers/reservationController');
const router = express.Router();
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const Reservation = require('./models/reservationModel');
const notificationRoutes = require('./routes/notificationRoutes');

// Importez les middlewares d'authentification
const { protect, isOrganizer } = require('./middlewares/authMiddleware');

// Importation des routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const eventRoutes = require('./routes/eventRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const moderationRoutes = require('./routes/moderationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const contactRoutes = require('./routes/contactRoutes');



const app = express();
const SECRET_KEY = 'your_secret_key';

// Middleware personnalisé pour vérifier l'authentification
const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
    } catch (error) {
      console.log('Token invalide');
      res.clearCookie('token'); // Supprime le token invalide
    }
  }
  
  next();
};

// Configuration des middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(methodOverride('_method'));

app.use(helmet()); // Sécurité des en-têtes HTTP
app.use(mongoSanitize()); // Prévention des injections NoSQL
app.use(xss()); // Prévention des attaques XSS
app.use(hpp()); // Protection contre la pollution des paramètres HTTP

// Configuration des vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware d'authentification global
app.use(checkAuth);

// Ajouter le dossier public pour les ressources statiques
app.use(express.static('public'));

app.use('/user', userRoutes);
app.use('/organizer', organizerRoutes);

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/admin', protect, adminRoutes);
app.use('/reservations', protect, reservationRoutes);
app.use('/api/favorites', protect, favoriteRoutes);
app.use('/api/moderation', protect, isOrganizer, moderationRoutes);
app.use('/notifications', protect, notificationRoutes);
app.use('/contact', contactRoutes);

app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Route racine
app.get('/', async (req, res) => {
  try {
    const currentDate = new Date();
    console.log('Page d\'accueil - Date actuelle:', currentDate);
    
    // Récupérer tous les événements approuvés
    const allEvents = await Event.find({ status: 'approved' })
      .populate('organizer')
      .sort({ date: 1 }); // Trier par date croissante (les plus proches d'abord)
    
    // Filtrer pour ne garder que les événements à venir
    const upcomingEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      console.log(`Événement: ${event.title}, Date: ${eventDate}, Est à venir: ${eventDate >= currentDate}`);
      return eventDate >= currentDate;
    });

    // Limiter à 10 événements pour l'affichage
    const eventsToDisplay = upcomingEvents.slice(0, 10);

    res.render('index', {
      user: req.user || null,
      events: eventsToDisplay || []
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.render('index', {
      user: req.user || null,
      events: []
    });
  }
});
// Routes protégées pour les événements
app.get('/events/edit/:id', protect, isOrganizer, eventController.getEditEventPage);
app.get('/verify/:qrCodeId', protect, reservationController.verifyQRCode);
app.get('/qrcode/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findOne({ qrCode: req.params.id });
    
    if (!reservation) {
      return res.status(404).send('QR code non trouvé');
    }
    
    // Générer un nouveau QR code
    const qrCodeService = require('./services/qrCodeService');
    const qrCodeData = `${req.protocol}://${req.get('host')}/verify/${reservation.qrCode}`;
    const qrCodeDataUrl = await qrCodeService.generateQRCode(qrCodeData);
    
    // Extraire les données base64 de l'URL de données
    const base64Data = qrCodeDataUrl.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Définir les en-têtes appropriés
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error('Erreur lors de la récupération du QR code:', error);
    res.status(500).send('Erreur lors de la récupération du QR code');
  }
});
// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).render('error', { 
    message: 'Page non trouvée',
    user: req.user || null 
  });
});

// Gestion des erreurs serveur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    message: 'Erreur serveur interne',
    user: req.user || null 
  });
});
const { initializeNotificationSystem } = require('./utils/initialization');
initializeNotificationSystem();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});