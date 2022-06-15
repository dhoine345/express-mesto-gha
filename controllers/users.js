const User = require('../models/user');
const { handleErrors, handleRequest } = require('../utils/utils');
const { resCodes, errorMessages } = require('../utils/constants');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(resCodes.CREATED_CODE).send({ data: user }))
    .catch((err) => {
      handleErrors(err.name, res);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(resCodes.INTERNAL_SERVER_ERROR).send(errorMessages.commonError));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => handleRequest(user, res, errorMessages.userError))
    .catch((err) => {
      handleErrors(err.name, res);
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => handleRequest(user, res, errorMessages.userError))
    .catch((err) => {
      handleErrors(err.name, res);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => handleRequest(user, res, errorMessages.userError))
    .catch((err) => {
      handleErrors(err.name, res);
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
};
