const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { errorMessages } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: errorMessages.incorrectEmail,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
