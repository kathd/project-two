require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo")(session);
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// ROUTES
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const photographersRouter = require('./routes/photographer')
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/photographer', photographersRouter)


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
