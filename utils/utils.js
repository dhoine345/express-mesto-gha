const { errorCodes, errorMessages } = require('./constants');

function handleErrors(name, res) {
  if (name === 'ValidationError' || name === 'CastError') {
    res.status(errorCodes.BAD_REQUEST).send(errorMessages.badRequestMessage);
    return;
  }
  res.status(errorCodes.INTERNAL_SERVER_ERROR).send(errorMessages.commonError);
}

function handleRequest(item, res, message) {
  if (!item) {
    res.status(errorCodes.NOT_FOUND_ERROR).send(message);
    return;
  }
  res.send({ item });
}

module.exports = {
  handleErrors,
  handleRequest,
};
