const express = require('express');
const app = express();
const routes = require('./routes');

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(routes);

app.listen(2500, () => {
  console.log('Example app listening on port 2500!');
})
