var express = require('express');
var routes = require('express').Router();
const home = require('../app_modules/home');
const users = require('../app_modules/users');
const login = require('../app_modules/login');
routes.use('/', home);
routes.use('/login', login);
routes.use('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy();
    }
    res.redirect('/login');

});

routes.use(function (req, res, next) {
    var isRoute = false;
    if (req.session) {

        if (req.session.user) {
            isRoute = true;
        }
    }
    if (isRoute) {
        next('route');
    } else {
        res.redirect('/login');
    }
});

routes.use('/users', users);

module.exports = routes;