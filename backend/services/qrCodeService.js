const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

// Générer un ID unique pour le QR code
exports.generateUniqueId = () => {
  return uuidv4();
};

// Générer un QR code à partir d'une chaîne de caractères
exports.generateQRCode = async (data) => {
  try {
    // Génère le QR code en base64
    const qrCodeDataUrl = await QRCode.toDataURL(data);
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Erreur lors de la génération du QR code:', error);
    throw error;
  }
};