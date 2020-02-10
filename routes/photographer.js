var express = require('express');
var router = express.Router();
const photographerModel = require("../models/Photographer");


// Display all photographer 

router.get('/', (req, res) => {
    photographerModel
    .find()
    .then(photographers => {
        res.render('show-all', {photographers})
    .catch(error => console.log(error));
    })
})


router.get('/add', (req, res)=> {
    res.render('forms/add');
})

router.post('/add', (req, res)=> {
  const {name,   description, price, location, email, profil_pictures, portfolio, categories }  = req.body
    photographerModel
    .create({name,   description, price, location, email, profil_pictures, portfolio, categories })
    .then(dbRes => res.redirect("/photographers"))
    .catch(dbErr => {
      console.log(dbErr);
     res.render('forms/add');
})
})


router.get("/:id", (req, res, next ) => {
    photographerModel
    .findById(req.params.id)
    .then(photographer => { 
        res.render("show-each", { photographer });
    })
    .catch(dbErr => console.error("OH no, db err :", dbErr));
})


router.get("/manage", (req, res, next)=> {
    photographerModel
    .find()
    .then(photographers => {
        res.render("manage-all", {photographers});
    })
    .catch(dbErr => console.error("OH no, db err :", dbErr))
    })



router.get("/:id/delete", (req, res, next) => {
    photographerModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
        res.redirect("/");
    })
    .catch(dbErr => console.error("OH no, db err :", dbErr));
})

router.get("/:id/edit", (req, res, next) => {
    photographerModel
    .findById(req.params.id)
    .then(dbRes => {
      res.render("forms/edit-ph", { photographer: dbRes });
    })
    .catch(dbErr => console.error(dbErr));
});

router.post("/:id/edit", (req, res, next) => {
    const {name,   description, price, location, email, profil_pictures, portfolio, categories }  = req.body
    photographerModel
    .findByIdAndUpdate(req.params.id, {
        name,  
        description, 
        price, 
        location, 
        email, 
        profil_pictures, 
        portfolio, 
        categories 
    })
    .then(dbRes => {
            res.redirect("/");
        })
        .catch(dbErr => {
            console.error("OH no, db err :", dbErr) 
            res.redirect("/")
            
         } );
    })

    module.exports = router;



