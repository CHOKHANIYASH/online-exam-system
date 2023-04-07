let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
let favicon = require('serve-favicon');
let passport = require('passport');
let flash    = require('connect-flash');
let MongoStore  = require('connect-mongo');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');


mongoose.connect('mongodb://127.0.0.1:27017/examDB').then(()=>{
  console.log('Database connected');
})
require('./config/passport')(passport);
// import express from 'express'
// import mongoose from 'mongoose'
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
let app = express();
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//session setup
const store = new MongoStore({
  mongoUrl:'mongodb://127.0.0.1:27017/examDB',
  secret:"gergerrfewwe",
  touchAfter:24*3600,
})
app.use(session({
  resave:false,
  saveUninitialized: false,
  secret: 'my_app_secret',
  store}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// let monk = require('monk');
// let db = monk('localhost:2701/examdb');


let index = require('./controllers/index');
let students = require('./controllers/students');
let faculties = require('./controllers/faculties');
let make_exam = require('./controllers/make_exam_controller');
let take_exam = require('./controllers/take_exam_controller');
let admin = require('./controllers/admin');
let login = require('./controllers/login_controller');

app.use('/',index);
app.use('/students', students);
app.use('/faculties', faculties);
app.use('/make_exam', make_exam);
app.use('/take_exam', take_exam);
app.use('/admin', admin);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen('3000',()=> console.log("serving at port 3000"))

module.exports = app;
