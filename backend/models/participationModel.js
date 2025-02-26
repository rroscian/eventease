// models/participationModel.js
const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true
    },
    participationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['upcoming', 'completed'],
        default: 'upcoming'
    }
});

module.exports = mongoose.model('Participation', participationSchema);