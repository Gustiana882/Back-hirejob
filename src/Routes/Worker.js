const express = require('express');

const route = express.Router();
const Auth = require('../Controllers/Auth/login');
const Register = require('../Controllers/Auth/register');
const Profile = require('../Controllers/Worker/profile');
const Skill = require('../Controllers/Worker/skill');
const Experience = require('../Controllers/Worker/experience');
const FileUpload = require('../Middleware/FileUpload');

route.get('/profile', Profile)
route.post('/skill', Skill.add)
route.post('/experience', FileUpload.single('image'), Experience.add)

module.exports = route;