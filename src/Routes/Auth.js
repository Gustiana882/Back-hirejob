const express = require('express');

const route = express.Router();
const Auth = require('../Controllers/Auth/login');
const Register = require('../Controllers/Auth/register');

route.post('/worker', Register.worker);
route.post('/employer', Register.employer);
route.post('/login/worker', Auth.worker);
route.post('/login/employer', Auth.employer);
module.exports = route;