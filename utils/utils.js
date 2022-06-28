const { resCodes, errorMessages } = require('./constants');
const NotFoundError = require('./errors/NotFoundError');
const BadRequestError = require('./errors/NotFoundError');
const ConflictError = require('./errors/ConflictError');

function handleErrors(err, next) {
  if (err.name === 'CastError') {
    throw new BadRequestError(errorMessages.badRequest);
  } else if (err.code === 11000) {
    throw new ConflictError(errorMessages.emailError);
  }
  next(err);
}

function handleRequest(item, res, message) {
  if (!item) {
    throw new NotFoundError(message);
  }
  res.status(resCodes.OK).send({ data: item });
}

module.exports = {
  handleErrors,
  handleRequest,
};
