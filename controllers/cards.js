const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

const getCard = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) res.status(404).send({ message: 'Карточка не найдена' });
      res.send({ data: card });
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) res.status(404).send({ message: 'Карточка не найдена' });
      res.send({ data: card });
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) res.status(404).send({ message: 'Карточка не найдена' });
      res.send({ data: card });
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  createCard,
  getCard,
  deleteCard,
  setLike,
  removeLike,
};
