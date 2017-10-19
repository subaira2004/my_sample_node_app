
var routes = require('express').Router();
const home = require('../app_modules/home');
const users = require('../app_modules/users');


routes.all('/',home);

routes.all('/users', users);

module.exports = routes;
