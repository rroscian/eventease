const nodemailer = require('nodemailer');

// Fonction pour envoyer un email de confirmation
exports.sendReservationConfirmation = async (to, eventInfo, qrCodeDataUrl) => {
  try {
    // Créer un compte Ethereal pour les tests
    const testAccount = await nodemailer.createTestAccount();
    
    // Créer un transporteur réutilisable qui utilisera SMTP Ethereal
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    const mailOptions = {
      from: `"Event Platform" <${testAccount.user}>`,
      to: to,
      subject: `Confirmation de réservation - ${eventInfo.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Confirmation de réservation</h2>
          <p>Bonjour,</p>
          <p>Votre réservation pour l'événement <strong>${eventInfo.title}</strong> a bien été enregistrée.</p>
          <p><strong>Date:</strong> ${new Date(eventInfo.date).toLocaleDateString('fr-FR')}</p>
          <p><strong>Lieu:</strong> ${eventInfo.location}</p>
          <p>Veuillez présenter le QR code ci-dessous à l'entrée de l'événement:</p>
          <div style="text-align: center; margin: 20px 0;">
            <img src="${qrCodeDataUrl}" alt="QR Code" style="max-width: 250px;">
          </div>
          <p>Nous vous remercions et vous souhaitons un excellent événement!</p>
          <p>L'équipe Event Platform</p>
        </div>
      `,
      attachments: [
        {
          filename: 'qrcode.png',
          content: qrCodeDataUrl.split(';base64,').pop(),
          encoding: 'base64'
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email de confirmation envoyé: %s', info.messageId);
    console.log('URL de prévisualisation: %s', nodemailer.getTestMessageUrl(info));
    
    // Retourner l'URL de prévisualisation pour l'afficher éventuellement à l'utilisateur
    return {
      success: true,
      previewUrl: nodemailer.getTestMessageUrl(info)
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};