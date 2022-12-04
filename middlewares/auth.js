const jwt = require('jsonwebtoken');
const {
  NOT_AUTHORIZED_ERROR_TEXT,
} = require('../utils/constants');

const AuthorizationError = require('../utils/errors/authError');

module.exports.tokenAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    return next(new AuthorizationError(NOT_AUTHORIZED_ERROR_TEXT));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    if (!payload) {
      return next(new AuthorizationError(NOT_AUTHORIZED_ERROR_TEXT));
    }
  } catch (err) {
    next(new AuthorizationError(NOT_AUTHORIZED_ERROR_TEXT));
  }
  req.user = payload;

  next();
};
