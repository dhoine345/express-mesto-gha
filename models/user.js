const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { errorMessages } = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { validateUrl } = require('../utils/utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: validateUrl,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function func(email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(errorMessages.emailOrPassword);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(errorMessages.emailOrPassword);
          }

          return user;
        });
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
