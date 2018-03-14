const express = require('express');
const routes = require('express').Router();
const Students = require('../Data/Students');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

routes.use('/dist/*', (req, res) => {
    res.sendFile(req.params[0],{root:'./views/users/dist'});
});

routes.get('/', (req, res) => {
    var user = req.session ? req.session.user : null;
    Students.GetAllStudents(function (err) {
        console.log(err);
    }, function (users) {
        res.render('users/users', {
            users: users,
            title: 'Users',
            menu: 'users',
            user: user
        });
    });
});

routes.get('/json', (req, res) => {
    var user = req.session ? req.session.user : null;
    Students.GetAllStudents(function (err) {
        console.log(err);
    }, function (users) {
        res.json(users);
    });
});



routes.get('/delete/:name', (req, res) => {

    var user = req.session ? req.session.user : null;
    var filter = {
        name: req.params.name
    };

    Students.DeleteSudent(function (err) {
        console.log(err);
    }, filter, function (deleteResult) {
        if (deleteResult.ok == 1) {
            res.redirect('/users');
        } else {
            res.redirect(req.originalUrl);
        }
    });
});


routes.get('/delete/:name/ajax', (req, res) => {

    var user = req.session ? req.session.user : null;
    var filter = {
        name: req.params.name
    };

    Students.DeleteSudent(function (err) {
        console.log(err);
    }, filter, function (deleteResult) {
        if (deleteResult.ok == 1) {
            res.json({success:true});
        } else {
            res.json({success:false,err:'Not Deleted! Something went wrong in DB!'});
        }
    });
});


routes.get('/edit/:name', (req, res) => {
    var user = req.session ? req.session.user : null;
    Students.GetStudentByName(function (err) {
        console.log(err);
    }, req.params.name, function (users) {
        var user = users.length > 0 ? users[0] : {};
        res.render('users/single-user', {
            user: user,
            title: 'User',
            menu: 'users',
            IsEditMode: true,
            user: user
        });
    });
});

routes.post('/edit', (req, res) => {
    var user = req.session ? req.session.user : null;
    var result = validateNGetPostData(req.body);
    if (result.success) {
        var data = result.data;
        var filter = {
            name: data.name
        };

        Students.UpdateSudent(function (err) {
            console.log(err);
        }, filter, data, function (updateResult) {
            if (updateResult.result.ok == 1) {
                res.redirect('/users');
            } else {
                res.redirect(req.originalUrl);
            }
        });
    } else {
        res.redirect('/');
    }
});

routes.post('/edit/:name/ajax', (req, res) => {
    var user = req.session ? req.session.user : null;
    var result = validateNGetPostData(req.body);
    if (result.success) {
        var data = result.data;
        var filter = {
            name: data.name
        };

        Students.UpdateSudent(function (err) {
            console.log(err);
        }, filter, data, function (updateResult) {
            if (updateResult.result.ok == 1) {
                res.json({success:true});
            } else {
                res.json({success:false,err:'Not updated! Something went wrong in DB!'});
            }
        });
    } else {
        res.json({success:false,err:'Something went wrong!'});
    }
});

routes.post('/new', (req, res) => {
    var result = validateNGetPostData(req.body);
    if (result.success) {
        var data = [];
        data.push(result.data);
        Students.InsertStudents(function (err) {
            console.log(err);
        }, data, function (insertResult) {
            if (insertResult.result.ok == 1) {
                res.redirect('/users');
            } else {
                res.redirect('/users/new');
                //  res.render('users/new', { users: users, title: 'Users', menu: 'users' });
            }
        });
    } else {
        res.redirect('/');
    }
});
routes.post('/new/ajax', (req, res)=> {
    var result = validateNGetPostData(req.body);
    if (result.success) {
        var data = [];
        data.push(result.data);
        Students.InsertStudents(function (err) {
            res.json({success:false,err:'err'+err});
        }, data, function (insertResult) {
            if (insertResult.result.ok == 1) {
                res.json({success:true});
            } else {
            res.json({success:false,err:'Not Saved! Something went wrong in DB!'});
            }
        });
    } else {
        res.json({success:false,err:'Something went wrong!'});
    }
});

function validateNGetPostData(body) {
    var result = {
        success: false,
        data: {}
    }
    if (body) {
        result.data.name = body.name || '';
        result.data.age = !isNaN(body.age) ? body.age : null;
        result.data.designation = body.designation || '';
        result.data.department = body.department || '';
        if (result.data.name != '') {
            result.success = true;
        }
    }

    return result;
}

routes.get('/new', (req, res) => {
    var user = req.session ? req.session.user : null;
    res.render('users/new-user', {
        title: 'New User',
        menu: 'users',
        user: user
    });
});

routes.get('/:name', (req, res) => {
    var user = req.session ? req.session.user : null;
    Students.GetStudentByName(function (err) {
        console.log(err);
    }, req.params.name, function (users) {
        var user = users.length > 0 ? users[0] : {};
        res.render('users/single-user', {
            user: user,
            title: 'User',
            menu: 'users'
        });
    });
});

routes.get('/:name/ajax', (req, res) => {
    var user = req.session ? req.session.user : null;
    Students.GetStudentByName(function (err) {
        console.log(err);
    }, req.params.name, function (users) {
        var user = users.length > 0 ? users[0] : {};
        res.json(user);        
    });
});
module.exports = routes;