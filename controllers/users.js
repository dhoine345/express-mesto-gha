const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleErrors, handleRequest } = require('../utils/utils');
const { resCodes, errorMessages, randomString } = require('../utils/constants');

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(resCodes.CREATED_CODE).send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email, _id: user._id,
    }))
    .catch((err) => {
      handleErrors(err.name, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, randomString, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => handleRequest(user, res, errorMessages.userError))
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

/*const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => handleRequest(user, res, errorMessages.userError))
    .catch((err) => {
      handleErrors(err.name, res);
    });
};*/

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new Error('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'NotValidError') {
        next(new Error('Некорректные данные'));
      } else {
        next(error);
      }
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
  login,
  getCurrentUser,
};
