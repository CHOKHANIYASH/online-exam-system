if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
let favicon = require('serve-favicon');
let passport = require('passport');
// let flash = require("connect-flash");
let flash = require('express-flash');
let MongoStore = require('connect-mongo');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
const dbUrl = process.env.dbUrl;

mongoose.connect(dbUrl).then(() => {
  console.log('Database connected');
});
require('./config/passport')(passport);

let app = express();
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine  setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//session setup
const store = new MongoStore({
  mongoUrl: dbUrl,
  secret: 'gergerrfewwe',
  touchAfter: 24 * 3600,
});
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'my_app_secret',
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

let index = require('./controllers/index');
let students = require('./controllers/students');
let make_exam = require('./controllers/make_exam_controller');
let take_exam = require('./controllers/take_exam_controller');
let admin = require('./controllers/admin');
let login = require('./controllers/login_controller');

app.use('/', index);
app.use('/students', students);
app.use('/make_exam', make_exam);
app.use('/take_exam', take_exam);
app.use('/admin', admin);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

app.listen('3000', () => console.log('serving at port 3000'));

module.exports = app;
