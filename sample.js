const http = require('http');
const reqProcessor = require('./reqProcessor.js');
const hostname = 'localhost';
const port = 2200;

const server = http.createServer((req, res) => {
   reqProcessor.reqProcessor(req,res);
});



server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});