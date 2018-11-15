var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://stdrw:sa@localhost:27017/CollageDB?authMechanism=DEFAULT&authSource=CollageDB';

module.exports = function (errs, callback) {
    try {
        // Use connect method to connect to the server
        MongoClient.connect(url,
            {
                useNewUrlParser: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000
            },
             function (err, client) {
            try {
                assert.equal(null, err);                
                callback(client.db("CollageDB"));
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