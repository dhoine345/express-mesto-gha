function handleErrors(name, res) {
  if (name === 'ValidationError' || name === 'CastError') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
    return;
  }
  res.status(500).send({ message: 'Произошла ошибка' });
}

function handleUserRequest(user, res) {
  if (!user) {
    res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    return;
  }
  res.send({ user });
}

function handleCardRequest(card, res) {
  if (!card) {
    res.status(404).send({ message: 'Карточка не найдена' });
    return;
  }
  res.status(200).send({ data: card });
}

module.exports = {
  handleErrors,
  handleUserRequest,
  handleCardRequest,
};
