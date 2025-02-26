const nodemailer = require('nodemailer');

// Afficher le formulaire de contact
exports.getContactForm = (req, res) => {
  res.render('contact', {
    user: req.user || null,
    success: null,
    error: null
  });
};

// Traiter l'envoi du formulaire de contact
exports.sendContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validation basique
    if (!name || !email || !message) {
      return res.render('contact', {
        user: req.user || null,
        error: 'Veuillez remplir tous les champs obligatoires.',
        success: null,
        formData: { name, email, subject, message }
      });
    }
    
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
    
    // Options du message
    const mailOptions = {
      from: `"Site Événementiel" <${testAccount.user}>`,
      to: testAccount.user, // Pour les tests, envoi à l'adresse Ethereal
      replyTo: email,
      subject: `Nouveau message de contact: ${subject || 'Sans objet'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sujet:</strong> ${subject || 'Sans objet'}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `
    };
    
    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Message envoyé: %s', info.messageId);
    console.log('URL de prévisualisation: %s', nodemailer.getTestMessageUrl(info));
    
    // Afficher le message de succès avec lien pour voir l'email
    res.render('contact', {
      user: req.user || null,
      success: `Votre message a été envoyé avec succès. Pour les tests, vous pouvez voir l'email ici: <a href="${nodemailer.getTestMessageUrl(info)}" target="_blank">Voir l'email</a>`,
      error: null
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    res.render('contact', {
      user: req.user || null,
      error: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer ultérieurement.',
      success: null,
      formData: req.body
    });
  }
};