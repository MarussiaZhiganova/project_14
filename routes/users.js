const router = require('express').Router();

const { getUser, getUserId } = require('../controllers/users');

router.get('/', getUser);
router.get('/:userId', getUserId);

module.exports = router;
