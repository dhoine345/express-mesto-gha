const { resCodes, errorMessages } = require('./constants');
const NotFoundError = require('./errors/NotFoundError');
const BadRequestError = require('./errors/NotFoundError');
const { regexUrl } = require('./constants');

function handleErrors(err, next) {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    throw new BadRequestError(errorMessages.badRequest);
  }
  next(err);
}

function handleRequest(item, res, message) {
  if (!item) {
    throw new NotFoundError(message);
  }
  res.status(resCodes.OK).send({ data: item });
}

function validateUrl(v) {
  return regexUrl.test(v);
}

module.exports = {
  handleErrors,
  handleRequest,
  validateUrl,
};
