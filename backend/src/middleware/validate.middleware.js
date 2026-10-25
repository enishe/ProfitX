const ApiError = require('../utils/ApiError');

function validate(schema) {
  return (req, res, next) => {
    const errors = schema(req.body);

    if (errors.length > 0) {
      return next(new ApiError(400, 'Kerkesa permban fusha te pavlefshme.', errors));
    }

    return next();
  };
}

module.exports = validate;
