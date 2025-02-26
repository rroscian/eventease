const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reservationDate: {
    type: Date,
    default: Date.now
  },
  qrCode: {
    type: String,
    required: true,
    unique: true
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  // Ajout des champs pour le suivi des notifications
  notified3DaysBefore: {
    type: Boolean,
    default: false
  },
  notified1DayBefore: {
    type: Boolean,
    default: false
  }
});

// Évitons les réservations en double
reservationSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Reservation', reservationSchema);