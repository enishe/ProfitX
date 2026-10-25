const express = require('express');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { validateRegistration, validateLogin } = require('../validators/auth.validators');

const router = express.Router();

router.post('/register', validate(validateRegistration), authController.register);
router.post('/login', validate(validateLogin), authController.login);

/** Rruge e mbrojtur: pranon vetem token te vlefshem */
router.get('/me', authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token i vlefshem',
    data: { user: req.user },
  });
});

module.exports = router;
