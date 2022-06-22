const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createCard,
  getCards,
  deleteCard,
  setLike,
  removeLike,
} = require('../controllers/cards');

router.post('/', auth, createCard);
router.get('/', auth, getCards);
router.delete('/:cardId', auth, deleteCard);
router.put('/:cardId/likes', auth, setLike);
router.delete('/:cardId/likes', auth, removeLike);

module.exports = router;
