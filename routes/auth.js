var express = require('express');
var router = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const uploader = require("./../config/cloudinary");

//VIEW FORM SIGNIN/UP
router.get("/signup", (req, res) => {
  const noNav = true
  res.render("auth/signup", {noNav});
});

router.get("/signin", (req, res) => {
  const noNav = true
  res.render("auth/signin", {noNav});
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


//SIGN IN WITH ACCOUNT
router.post("/signin", (req, res, next) => {
  const user = req.body;

  if (!user.email || !user.password) {
    // one or more field is missing
    //PUT ERROR MSG
    return res.redirect("/auth/signin");
  }

  userModel
    .findOne({ email: user.email })
    .then(dbRes => {
      if (!dbRes) {
        // no user found with this email
        //ERROR MSG "Wrong email/password"
        return res.redirect("/auth/signin");
      }
      // user has been found in DB !
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        // encryption says : password match success
        const { _doc: clone } = { ...dbRes }; // make a clone of db user

        delete clone.password; // remove password from clone
        // console.log(clone);

        req.session.currentUser = clone; // user is now in session... until session.destroy
        return res.redirect("/");
      } else {
        // encrypted password match failed
        //ERROR MSG "Wrong email/password"
        return res.redirect("/auth/signin");
      }
    })
    .catch(next);
});


//SIGN OUT
router.get("/signout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
