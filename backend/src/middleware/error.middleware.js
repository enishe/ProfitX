const ApiError = require('../utils/ApiError');

function notFound(req, res, next) {
  next(new ApiError(404, `Rruga ${req.method} ${req.originalUrl} nuk u gjet`));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message =
    err instanceof ApiError
      ? err.message
      : 'Gabim i brendshem i serverit';

  if (statusCode >= 500) {
    console.error('Gabim i serverit:', err.message);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
}

module.exports = { notFound, errorHandler };