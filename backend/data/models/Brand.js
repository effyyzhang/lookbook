const Sequelize = require('sequelize');
const conn = require('../connection');

const {
  UUID, UUIDV4, STRING, INTEGER, TEXT, BOOLEAN,
} = Sequelize;

const Brand = conn.define('brand', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },

  name: {
    type: STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true,
    },
  },

  image: {
    type: STRING,
    allowNull: false,
    unique: false,
    validate: {
      isURL: true,
    },
  },

  description: {
    type: TEXT,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true,
    },
  },

  priceRange: {
    type: INTEGER,
    allowNull: true,
    unique: false,
    validate: {
      min: 0,
      max: 5,
    },
  },
  favorite: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Brand;
