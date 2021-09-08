const express = require('express');

const route = express.Router();
const Auth = require('./Routes/Auth');
const Worker = require('./Routes/Worker');

route.use('/', Auth);

route.use('/worker', Worker);

route.use('*', (req, res) => {
  res.status(404).json('page not found!');
});

module.exports = route;
