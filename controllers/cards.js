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
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return Promise.reject(new Error(`Карточка с _id:${req.params.cardId} не найдена в базе данных`));
      }
      const { owner } = card;
      return owner;
    })
    .then((owner) => {
      if (req.user._id === owner.toString()) {
        return Card.findByIdAndRemove(req.params.cardId);
      }
      return Promise.reject(new Error('нет доступа для удаления карточки'));
    })
    .then(() => res.status(200).send({ message: `Карточка с _id:${req.params.cardId} успешно удалена из базы данных` }))
    .catch((err) => res.status(403).send({ message: err.message }));
};
