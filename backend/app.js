const express = require('express');
const session = require('express-session');
const path = require('path');
const jwt = require('jwt-simple');
const db = require('./data');

// Routes
const brandsSubRouter = require('./routes/brands');
const tagsSubRouter = require('./routes/tags');
const usersSubRouter = require('./routes/users');

const app = express();
const { User } = db.models;
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const routes = {
  Brand: 'brands',
  Tag: 'tags',
  User: 'users',
};
// Basic routes are auto-generated here
// for the rest user subroutes
Object.keys(routes).forEach((key) => {
  app.get(`/api/${routes[key]}`, (req, res, next) => {
    db.models[key]
      .findAll()
      .then((items) => res.send(items))
      .catch(next);
  });
});

app.use('/api/brands', brandsSubRouter);
app.use('/api/tags', tagsSubRouter);
app.use('/api/users', usersSubRouter);

app.use((err, req, res, next) => {
  let message = "Something's not right";
  if (err.errors) {
    message = err.errors[0].message;
  } else if (err.message) {
    message = err.message;
  }

  if (err) {
    res.status(err.status || 500).send({ message });
  }
});
module.exports = app;
