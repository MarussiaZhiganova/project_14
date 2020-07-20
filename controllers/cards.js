const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCards = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res.status(400).send({ message: err.message });
      console.error(err.stack);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if(!card) {
        return res.status(404).send({message: 'Данной карточки нет!'})
      }
      if(String(card.owner) !== req.user._id) {
        return res.status(401).send({message: 'Это не Ваша карта! Нельзя удалять!'})
      }
        return res.send({message: 'Ваша карточка удалена!'})
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при удалении карточки' }));
};