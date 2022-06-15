const express = require('express');
const mongoose = require('mongoose');
const { resCodes, errorMessages } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '62a2ffd2ed7f327aef731968',
  };

  next();
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(resCodes.NOT_FOUND_ERROR).send(errorMessages.pageNotFound);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
