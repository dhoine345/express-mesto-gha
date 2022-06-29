const jwt = require('jsonwebtoken');
const { randomString } = require('../utils/constants');
const { errorMessages } = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorMessages.unauthorized);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, randomString);
  } catch (err) {
    next(new UnauthorizedError(errorMessages.unauthorized));
  }

  req.user = payload;
  next();
};
