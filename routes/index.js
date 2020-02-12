var express = require('express');
var router = express.Router();
const userModel = require('../models/User');
const uploader = require("./../config/cloudinary");

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

router.post('/account/edit', uploader.single("avatar"), function(req, res, next) {
  const user = req.body;
  if (req.file) user.avatar = req.file.secure_url
  userModel
  .findByIdAndUpdate(req.session.currentUser._id, user)
  .then(user => {
    res.redirect('/account')
    })
  .catch(err => {
    console.error("OH no, db err :", err)
    res.redirect('/account/edit')
  });
});




module.exports = router;
