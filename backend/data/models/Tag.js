const Sequelize = require('sequelize');
const conn = require('../connection');

const { UUID, UUIDV4, STRING } = Sequelize;

const Tag = conn.define('tag', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },

  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Tag;
