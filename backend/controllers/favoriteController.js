const Favorite = require('../models/favoriteModel');
const Event = require('../models/eventModel');

exports.addFavorite = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id; // Assumant que l'utilisateur est authentifié

    const favorite = await Favorite.create({
      user: userId,
      event: eventId
    });

    res.status(201).json({
      success: true,
      data: favorite
    });
  } catch (error) {
    // Gestion de l'erreur de doublon
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Cet événement est déjà dans vos favoris'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    await Favorite.findOneAndDelete({
      user: userId,
      event: eventId
    });

    res.status(200).json({
      success: true,
      message: 'Événement retiré des favoris'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.find({ user: userId })
      .populate('event')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      data: favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};