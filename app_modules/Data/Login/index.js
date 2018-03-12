var assert = require('assert');
var database = require('../database.js');


var login = function (errs, username,password, callback) {
    try {
        database(errs, function (db) {
            try {
                var users = db.collection('users');
                users.find({ username:username,password:password }).toArray(function (err, docs) {
                    callback(docs);
                });
               
            }
            catch (error) {
                errs(error);
            }
        });
    }
    catch (error) {
        errs(error);
    }
}

module.exports.login=login;