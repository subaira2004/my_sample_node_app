
var routes = require('express').Router();
const home = require('../home.js');
const users = require('../app_modules/users');


routes.all('/',home);

routes.all('/users', users);

module.exports = routes;
