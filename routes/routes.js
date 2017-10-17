
var routes = require('express').Router();
const home = require('../home.js');
const users = require('../app_modules/users.js');


routes.get('/',home);

routes.get('/users', users);

module.exports = routes;
