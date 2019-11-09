const express = require('express');
const { Tag } = require('../data/models');

const router = express.Router();

router.get('/:id', (req, res, next) => {
  Tag.findOne({ where: { id: req.params.id } })
    .then((tag) => res.send(Tag))
    .catch(next);
});

module.exports = router;
