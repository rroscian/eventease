const { body, validationResult } = require('express-validator');

app.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Logique d'inscription ou de connexion ici, tout le reste est ajustable
  }
);
