const routes = require('express').Router();
const login = require('../Data/Login');

routes.get('/', (req, res) => {
    if (req.session && req.session.user) {
        res.redirect('/');
    } else {
        res.render('login/login', {
            title: 'Login',
            menu: 'login'
        });
    }
})
routes.post('/', (req, res) => {
    
    if (req.body.username && req.body.password) {
       
        login.login(function (err) { console.log(err); },req.body.username, req.body.password, function (result) {
            
            if (result && result.length>0) {
                req.session.user = result[0];
                res.redirect('/');
            } else {
                res.render('login/login', {
                    title: 'Login',
                    menu: 'login',
                    err:"incorrect username or password is entered!"
                });
            }
        });
    } else {
        res.redirect('/login');
    }
})
module.exports = routes;