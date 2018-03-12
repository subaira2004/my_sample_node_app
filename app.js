const express = require('express');
const app = express();
const routes = require('./routes');
//const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);


app.set('view engine', 'pug');

//request logging
//app.use(morgan('tiny'));


app.use(express.static('public'));

var sessOpt = {
  secret: "my key",
  store: new mongoStore({
    url: 'mongodb://stdrw:sa@localhost:27017/CollageDB?authMechanism=DEFAULT&authSource=CollageDB'
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30*60000 
  }
};

app.use(session(sessOpt));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(routes);

app.listen(2500, () => {
  console.log('Example app listening on port 2500!');
})