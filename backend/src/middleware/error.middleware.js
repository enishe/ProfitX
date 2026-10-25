const ApiError = require('../utils/ApiError');

function notFound(req, res, next) {
  next(new ApiError(404, `Rruga ${req.method} ${req.originalUrl} nuk u gjet`));
}

function errorHandler(err, req, res, next) {
  const isInvalidJson = err.type === 'entity.parse.failed';
  const statusCode = isInvalidJson ? 400 : (err.statusCode || 500);
  const message = isInvalidJson
    ? 'Trupi i kerkeses duhet te jete JSON i vlefshem'
    : err instanceof ApiError
      ? err.message
      : 'Gabim i brendshem i serverit';

  if (statusCode >= 500) {
    console.error('Gabim i serverit:', err.message);
  }

  const response = {
    success: false,
    statusCode,
    message,
  };

  if (err.errors) response.errors = err.errors;

  res.status(statusCode).json(response);
}

module.exports = { notFound, errorHandler };
