const express = require('express');
const app = express();
const routes = require('./routes/routes.js');

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use('/',routes);

app.listen(2500, function () {
  console.log('Example app listening on port 2500!');
})
