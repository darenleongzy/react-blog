const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

const uri = "mongodb+srv://admin:9g4Xke41m@cluster0.peafp.mongodb.net/?retryWrites=true&w=majority"
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(session({ secret: 'Blog', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

mongoose.connect(uri, {  useNewUrlParser: true,  useUnifiedTopology: true})
  .then(() => {  
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err));

mongoose.set('debug', true);

// Add models
require('./models/Articles');
require('./models/Comments');
require('./models/Images');
// Add routes
app.use(require('./routes'));

app.use((req, res, next) => {
  const err = new Error('Not Found1');
  err.status = 403;
  next(err);
});

if (!isProduction) {
  console.log("not production")
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  console.log("not production")
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log('connected on port ' + port));