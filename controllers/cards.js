const Card = require('../models/card');
const { handleValidationOrCastError, handleCardRequest } = require('../utils/utils');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      handleValidationOrCastError(err.name, res);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => handleCardRequest(card, res))
    .catch((err) => {
      handleValidationOrCastError(err.name, res);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => handleCardRequest(card, res))
    .catch((err) => {
      handleValidationOrCastError(err.name, res);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => handleCardRequest(card, res))
    .catch((err) => {
      handleValidationOrCastError(err.name, res);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  setLike,
  removeLike,
};
