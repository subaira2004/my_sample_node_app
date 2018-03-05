var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://stdrw:sa@localhost:27017/CollageDB?authMechanism=DEFAULT&authSource=CollageDB';

module.exports = function (errs, callback) {
    try {
        // Use connect method to connect to the server
        MongoClient.connect(url, function (err, client) {
            try {
                assert.equal(null, err);                
                callback(client.db("CollageDB"));
                client.close();
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