const routes = require('express').Router()
routes.get('/', (req, res) => {
    var user = req.session ? req.session.user : null;

    res.render('home/home', {
        title: 'Welcome to My Site',
        menu: 'home',
        user:user
    });
})

module.exports = routes;