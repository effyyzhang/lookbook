const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const axios = require('axios');
const { google } = require('googleapis');
const connection = require('../connection');

const { Sequelize } = connection;

const {
  STRING, UUID, UUIDV4, VIRTUAL, BOOLEAN,
} = Sequelize;

const User = connection.define(
  'user',
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    firstName: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    lastName: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 255],
        isEmail: true,
      },
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [6, 255],
      },
    },
    fullName: {
      type: VIRTUAL,
      get() {
        const fullName = `${this.get('firstName')} ${this.get('lastName')}`;
        return fullName;
      },
    },
    isAdmin: {
      type: BOOLEAN,
      defaultValue: false,
    },
    googleId: {
      type: STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      async beforeCreate(user) {
        const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS * 1);
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
      },
    },
  },
);

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.findByToken = async function (token) {
  try {
    const { id } = jwt.decode(token, process.env.SECRET);
    if (id.includes('-')) {
      return (await this.findByPk(id)).get();
      // return (await this.findOne({ where: { id } })).get();
    }
    return (await this.findOne({ where: { googleId: id } })).get();
  } catch (ex) {
    const err = new Error('authorization failed');
    err.status = 401;
    throw err;
  }
};

module.exports = User;
