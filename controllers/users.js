const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  console.log('getuser', req.params);

  User.findById(req.params.userId)
    .then((user) => res.send({ user }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,
};
