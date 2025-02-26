const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true // Supprime les espaces avant/après
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Convertit en minuscules
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'organizer', 'admin'],
    default: 'user'
  },
  followedOrganizers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// Hashage du mot de passe UNIQUEMENT avant sauvegarde
userSchema.pre('save', async function (next) {
  // Ne hache que si le mot de passe est modifié
  if (!this.isModified('password')) return next();
  
  try {
    // Génération du sel et hachage
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode de comparaison de mot de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);