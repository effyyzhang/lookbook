// DB Stuff
const connection = require('./connection');
const syncAndSeed = require('./syncAndSeed');

// Models
const {
  Brand, Tag, User,
} = require('./models');

// Relationships
User.hasMany(Brand);
Brand.hasMany(Tag);

module.exports = {
  connection,
  models: {
    Brand,
    User,
    Tag,
  },
  syncAndSeed,
};
