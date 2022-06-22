const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.post('/', auth, createUser);
router.get('/', auth, getUsers);
router.get('/:userId', auth, getUserById);
router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateProfile);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
