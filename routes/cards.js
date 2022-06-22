const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  createCard,
  getCards,
  deleteCard,
  setLike,
  removeLike,
} = require('../controllers/cards');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    //link: Joi.string().required().link(),
  }),
}), auth, createCard);
router.get('/', auth, getCards);
router.delete('/:cardId', auth, deleteCard);
router.put('/:cardId/likes', auth, setLike);
router.delete('/:cardId/likes', auth, removeLike);

module.exports = router;
