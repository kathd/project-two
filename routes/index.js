var express = require('express');
var router = express.Router();
const userModel = require('../models/User');
const photographerModel = require('../models/Photographer');
const uploadCloud = require('./../config/cloudinary');

/* GET home page. */
router.get('/', function(req, res, next) {
  const showAbout = true;
  
  photographerModel
  .find()
  .then(photographers => {
    // res.send(photographers)
    res.render('index', {
      showAbout,
      photographers,
      css: ['home.css']
    })
  })
  .catch(err => console.error(err))
});

router.get('/account', function(req, res, next) {
  userModel
  .findById(req.session.currentUser._id)
  .then(user => {
    res.render('user-account', { 
      user,
      css: ['user.css']
    })
  })
  .catch(err => console.error("OH no, db err :", err));
});

router.get('/account/edit', function(req, res, next) {
  userModel
  .findById(req.session.currentUser._id)
  .then(user => {
    res.render('forms/edituser', { 
      user,
      css: ['form.css']
    })
  })
  .catch(err => console.error("OH no, db err :", err));
});

router.post('/account/edit', function(req, res, next) {
  userModel
  .findByIdAndUpdate(req.session.currentUser._id, req.body)
  .then(user => {
    res.redirect('/account')
    })
  .catch(err => {
    console.error("OH no, db err :", err)
    res.redirect('/account/edit')
  });
});




module.exports = router;