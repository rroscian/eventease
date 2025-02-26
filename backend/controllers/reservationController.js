const Reservation = require('../models/reservationModel');
const Event = require('../models/eventModel');
const User = require('../models/userModel'); 
const qrCodeService = require('../services/qrCodeService');
const emailService = require('../services/emailService');

exports.createReservation = async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const userId = req.user.id;
  
      // Vérifier si l'événement existe et est approuvé
      const event = await Event.findOne({ 
        _id: eventId,
        status: 'approved'
      });
  
      if (!event) {
        return res.status(404).render('error', { 
          message: 'Événement non trouvé ou non disponible pour réservation', 
          user: req.user 
        });
      }
  
      // Vérifier si l'utilisateur a déjà une réservation pour cet événement
      const existingReservation = await Reservation.findOne({ event: eventId, user: userId });
      if (existingReservation) {
        return res.status(400).render('error', { 
          message: 'Vous avez déjà réservé pour cet événement', 
          user: req.user 
        });
      }
  
      // Vérifier la capacité de l'événement
      const reservationsCount = await Reservation.countDocuments({ event: eventId });
      if (event.capacity && reservationsCount >= event.capacity) {
        return res.status(400).render('error', { 
          message: 'Désolé, cet événement est complet', 
          user: req.user 
        });
      }
  
      // Générer un identifiant unique pour le QR code
      const qrCodeId = qrCodeService.generateUniqueId();
      
      // Créer l'URL à encoder dans le QR code
      const qrCodeData = `${req.protocol}://${req.get('host')}/verify/${qrCodeId}`;
      
      // Générer le QR code
      const qrCodeDataUrl = await qrCodeService.generateQRCode(qrCodeData);
  
      // Créer la réservation dans la base de données
      const reservation = new Reservation({
        event: eventId,
        user: userId,
        qrCode: qrCodeId
      });
  
      await reservation.save();
  
      // Récupérer les informations de l'utilisateur pour l'email
      const user = await User.findById(userId);
  
      // Envoyer l'email de confirmation
      const emailResult = await emailService.sendReservationConfirmation(
        user.email,
        {
          title: event.title,
          date: event.date,
          location: event.location
        },
        qrCodeDataUrl
      );
  
      // Rediriger vers la page de confirmation avec le QR code
      res.render('reservationConfirmation', {
        event,
        qrCodeDataUrl,
        user: req.user,
        emailPreviewUrl: emailResult.success ? emailResult.previewUrl : null
      });
  
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      res.status(500).render('error', { 
        message: 'Une erreur est survenue lors de la réservation', 
        user: req.user 
      });
    }
  };

exports.getUserReservations = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const reservations = await Reservation.find({ user: userId })
        .populate('event')
        .sort({ reservationDate: -1 });
  
      // Modifiez cette ligne si nécessaire pour qu'elle pointe vers votre fichier de vue correct
      res.render('user/reservation', {
        reservations,
        user: req.user
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      res.status(500).render('error', { 
        message: 'Une erreur est survenue', 
        user: req.user 
      });
    }
  };

// Vérifier un QR code (pour les organisateurs)
exports.verifyQRCode = async (req, res) => {
  try {
    const qrCodeId = req.params.qrCodeId;

    const reservation = await Reservation.findOne({ qrCode: qrCodeId })
      .populate('event')
      .populate('user');

    if (!reservation) {
      return res.status(404).render('qrVerification', { 
        valid: false, 
        message: 'QR code invalide ou inexistant',
        user: req.user
      });
    }

    if (reservation.isUsed) {
      return res.status(400).render('qrVerification', { 
        valid: false, 
        message: 'Ce billet a déjà été utilisé',
        reservation,
        user: req.user
      });
    }

    // Vérifier si l'événement est toujours valide
    const event = reservation.event;
    const now = new Date();
    if (new Date(event.date) < now) {
      return res.status(400).render('qrVerification', { 
        valid: false, 
        message: 'Cet événement est déjà passé',
        reservation,
        user: req.user
      });
    }

    // Marquer le billet comme utilisé
    reservation.isUsed = true;
    await reservation.save();

    res.render('qrVerification', { 
      valid: true, 
      message: 'Billet valide! Entrée autorisée.',
      reservation,
      user: req.user
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du QR code:', error);
    res.status(500).render('error', { 
      message: 'Une erreur est survenue', 
      user: req.user 
    });
  }
};