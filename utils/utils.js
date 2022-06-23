const { resCodes, errorMessages } = require('./constants');

function handleErrors(name, res) {
  if (name === 'ValidationError' || name === 'CastError') {
    res.status(resCodes.BAD_REQUEST).send(errorMessages.badRequest);
    return;
  }
  res.status(resCodes.INTERNAL_SERVER_ERROR).send(errorMessages.commonError);
}

function handleRequest(item, res, message) {
  if (!item) {
    res.status(resCodes.NOT_FOUND_ERROR).send(message);
    return;
  }
  res.status(resCodes.OK).send({ data: item });
}

module.exports = {
  handleErrors,
  handleRequest,
};
