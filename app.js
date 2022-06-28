const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { resCodes, errorMessages } = require('./utils/constants');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { regexUrl } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexUrl),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(resCodes.NOT_FOUND_ERROR).send(errorMessages.pageNotFound);
});

app.use(errors());

app.use((err, req, res, next) => {
  console.log('errinapp', err);
  const { statusCode = resCodes.INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === resCodes.INTERVAL_SERVER_ERROR
        ? errorMessages.server
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
