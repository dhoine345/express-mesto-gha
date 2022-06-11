const router = require('express').Router();
const {
  createUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUser);
router.get('/:userId', getUserById);
router.patch('/:userId', updateProfile);
router.patch('/:userId', updateAvatar);

module.exports = router;
