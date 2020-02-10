var express = require('express');
var router = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const uploader = require("./../config/cloudinary");

//VIEW FORM SIGNIN/UP
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/signin", (req, res) => {
  res.render("auth/signin");
});


//CREATE ACCOUNT
router.post("/signup", uploader.single("avatar"), (req, res, next) => {
  const user = req.body; 

  if (req.file) user.avatar = req.file.secure_url;

  if (!user.email || !user.password) {
    //CAN ADD ERROR MSG
    return res.redirect("/auth/signup");
  } else {
    userModel
      .findOne({ email: user.email })
      .then(dbRes => {
        if (dbRes) {
          //CAN ADD MSG ERROR
          return res.redirect("/auth/signup"); //
        }

        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(user.password, salt);
        
        user.password = hashed; 
    
        userModel
        .create(user)
        .then(() => res.redirect("/auth/signin"));
      })
      .catch(next);
  }
});



module.exports = router;
