const express = require('express');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

/** Rruge e mbrojtur: pranon vetem token te vlefshem */
router.get('/me', authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token i vlefshem',
    data: { user: req.user },
  });
});

module.exports = router;
