const express = require('express');
const mongoose = require('mongoose');
const { resCodes, errorMessages } = require('./utils/constants');
const { createUser, login } = require('./controllers/users');

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

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(resCodes.NOT_FOUND_ERROR).send(errorMessages.pageNotFound);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
