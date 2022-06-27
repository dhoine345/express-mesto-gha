const jwt = require('jsonwebtoken');
const { randomString } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(400)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, randomString);
  } catch (err) {
    return res
      .status(400)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  next();
};
