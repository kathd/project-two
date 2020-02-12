var express = require('express');
var router = express.Router();
const userModel = require('../models/User');
const uploadCloud = require('./../config/cloudinary');

/* GET home page. */
router.get('/', function(req, res, next) {
  const showAbout = true;
  res.render('index', {
    showAbout,
    css: ['home.css']
  });
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


module.exports = router;
