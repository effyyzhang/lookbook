const express = require('express');
const jwt = require('jwt-simple');

const { User } = require('../data/models');

const router = express.Router();

router.use(express.json());

router.get('/:id', (req, res, next) => {
  // This route is for admin only
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.send(user))
    .catch(next);
});

module.exports = router;
