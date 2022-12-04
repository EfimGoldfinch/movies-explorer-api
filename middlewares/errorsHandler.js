const { DEFAULT_ERROR_TEXT } = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? DEFAULT_ERROR_TEXT
        : message,
    });
  next();
});
