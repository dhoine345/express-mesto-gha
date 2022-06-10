const router = require('express').Router();
const { createUser, getUser, getUserById } = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUser);
router.get('/:userId', getUserById);

module.exports = router;
