const Card = require('../models/card');
const { handleErrors, handleRequest } = require('../utils/utils');
const { resCodes, errorMessages } = require('../utils/constants');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(resCodes.CREATED_CODE).send({ data: card }))
    .catch((err) => {
      handleErrors(err.name, res);
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(resCodes.INTERNAL_SERVER_ERROR).send(errorMessages.commonError));
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (req.user._id.toString() !== card.owner.toString()) { res.status(403).send({ message: 'Переданы некорректные данные' }); }
      Promise.resolve(handleRequest(card, res, errorMessages.cardError))
        .then(() => card.remove());
    })
    .catch((err) => {
      handleErrors(err.name, res);
    });
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => handleRequest(card, res, errorMessages.cardError))
    .catch((err) => {
      handleErrors(err.name, res);
    });
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => handleRequest(card, res, errorMessages.cardError))
    .catch((err) => {
      handleErrors(err.name, res);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  setLike,
  removeLike,
};
