var express = require('express');
var router = express.Router();
const userModel = require('../models/User');
const photographerModel = require('../models/Photographer');
const uploader = require("./../config/cloudinary");
const protectUserRoute = require("../middlewares/protectUserRoute");
const protectAdminRoute = require("../middlewares/protectAdminRoute");


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

router.get('/account', protectUserRoute, function(req, res, next) {
  userModel
  .findById(req.session.currentUser._id)
  .populate('photogfav')
  .then(user => {
    res.render('user-account', { 
      user,
      css: ['user.css']
    })
  })
  .catch(err => console.error("OH no, db err :", err));
});

router.post('/account/:id/remove', protectUserRoute, function(req, res, next) {
  photographerModel
  .findByIdAndUpdate(req.params.id, { $pull: { fans : req.session.currentUser._id}}, {new:true})
  .then(photographer => { 
    debugger
    userModel
    .findByIdAndUpdate(req.session.currentUser._id, { $pull : { photogfav : req.params.id}},{new:true})
    .then(user => {
      debugger
      res.redirect('/account')
    })
    .catch(err => console.error("OH no, db err :", err));
  })
  .catch(err => console.error("OH no, db err :", err));
})


router.get('/account/edit', protectUserRoute, function(req, res, next) {
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