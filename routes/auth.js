var express = require('express');
var router = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcryptjs");


//VIEW FORM SIGNIN/UP
router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});



module.exports = router;
