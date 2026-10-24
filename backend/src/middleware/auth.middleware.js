const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

/**
 * Verifikon JWT nga Authorization: Bearer <token>.
 * JWT_SECRET lexohet vetem nga .env (process.env).
 */
function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || typeof header !== 'string') {
    return next(new ApiError(401, 'Token-i mungon'));
  }

  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new ApiError(401, 'Token-i mungon'));
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(new ApiError(500, 'JWT_SECRET nuk eshte konfiguruar'));
  }

  try {
    const payload = jwt.verify(token, secret);
    req.user = {
      id: payload.userId,
      email: payload.email,
    };
    return next();
  } catch {
    return next(new ApiError(401, 'Token i pavlefshem'));
  }
}

module.exports = { authenticate };
