require("dotenv").config();
require("./config/dbconnect");


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hbs = require("hbs");
var cookieParser = require('cookie-parser');
var session = require("express-session")
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo")(session);
var bodyParser = require('body-parser')



const app = express();

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())

hbs.registerPartials(path.join(__dirname, "views/partials"))

//INIT SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  })
);


//MIDDLEWARES
app.use(require("./middlewares/loginStatus"));

// ROUTES
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const photographersRouter = require('./routes/photographer')
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/photographers', photographersRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
