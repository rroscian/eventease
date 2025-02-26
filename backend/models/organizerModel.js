const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const organizerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'organizer', // Pour différencier des utilisateurs normaux
  },
});

// Hashage du mot de passe avant sauvegarde
organizerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

organizerSchema.methods.comparePassword = async function(password) {
  try {
    console.log('Comparing passwords:');
    console.log('Input password (not hashed):', password);
    console.log('Stored hashed password:', this.password);
    const isMatch = await bcrypt.compare(password, this.password);
    console.log('Password match result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};

module.exports = mongoose.model('Organizer', organizerSchema);
