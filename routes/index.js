var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const showAbout = true;
  res.render('index', {
    showAbout,
    css: ['home.css']
  });
});

module.exports = router;
