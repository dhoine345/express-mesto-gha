const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { regexUrl } = require('../utils/constants');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexUrl),
  }),
}), updateAvatar);

module.exports = router;
