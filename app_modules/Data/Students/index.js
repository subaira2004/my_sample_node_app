var assert = require('assert');
var database = require('../database.js');

var GetAllStudents = function (errs, pageSize, currentPage, callback) {
    try {
        var result = { currentPage: currentPage, pageSize: pageSize };
        var skip = ((currentPage - 1) * pageSize);
        var limit = parseInt(pageSize);
        database(errs, function (db) {
            var Students = db.collection('Students');
            Students.count(function (err, count) {
                assert.equal(null, err);
                result.records = count;
                var cursor = Students.find({}).skip(skip).limit(limit);
                cursor.toArray(function (err, docs) {
                    assert.equal(null, err);
                    result.users = docs;
                    callback(result);        
                });
            });
        });
    }
    catch (error) {
        errs(error);
    }
}


var GetStudentByName = function (errs, name, callback) {
    try {
        database(errs, function (db) {
            try {
                var Students = db.collection('Students');
                Students.find({ name: name }).toArray(function (err, docs) {
                    assert.equal(null, err);
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

var InsertStudents = function (errs, arrayOfEmployees, callback) {
    try {
        database(errs, function (db) {
            try {
                var Students = db.collection('Students');
                Students.insertMany(arrayOfEmployees, function (err, result) {
                    assert.equal(null, err);
                    callback(result);

                });
            } catch (error) {
                errs(error);
            }
        });
    }
    catch (error) {
        errs(error);
    }
}

var UpdateSudent = function (errs, filter, student, callback) {
    try {
        database(errs, function (db) {
            try {
                var Students = db.collection('Students');
                Students.replaceOne(filter, student, function (err, result) {
                    assert.equal(null, err);
                    callback(result);


                });
            } catch (error) {
                errs(error);
            }
        });
    }
    catch (error) {
        errs(error);
    }
}

var DeleteSudent = function (errs, filter, callback) {
    try {
        database(errs, function (db) {
            try {
                var Students = db.collection('Students');
                Students.deleteOne(filter, function (err, result) {
                    assert.equal(null, err);
                    callback({ ok: 1 });

                });
            } catch (error) {
                errs(error);
            }
        });
    }
    catch (error) {
        errs(error);
    }
}

module.exports.GetAllStudents = GetAllStudents
module.exports.GetStudentByName = GetStudentByName
module.exports.InsertStudents = InsertStudents
module.exports.UpdateSudent = UpdateSudent
module.exports.DeleteSudent = DeleteSudent
