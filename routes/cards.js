const router = require('express').Router();
const {
  getCards, createCards, deleteCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCards);
router.delete('/:cardId', deleteCard);

module.exports = router;
