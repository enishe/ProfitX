const authService = require('../services/auth.service');

/**
 * POST /api/auth/register
 * Pergjigje sukses: perdoruesi i krijuar (pa passwordHash)
 */
async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({
      success: true,
      message: 'Regjistrimi u krye me sukses',
      data: { user },
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * POST /api/auth/login
 * Sukses: perdoruesi + JWT
 * Kredenciale te pasakta: 401 (permes ApiError / error middleware)
 */
async function login(req, res, next) {
  try {
    const { user, token } = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      message: 'Hyrja u krye me sukses',
      data: { user, token },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
};
