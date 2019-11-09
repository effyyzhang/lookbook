const express = require('express');
const { Brand } = require('../data/models');

const router = express.Router();

router.get('/:id', (req, res, next) => {
  Brand.findOne({ where: { id: req.params.id } })
    .then((brand) => res.send(brand))
    .catch(next);
});

module.exports = router;
