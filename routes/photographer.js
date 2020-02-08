var express = require('express');
var router = express.Router();
const photographerModel = require(("../models/Photographer");


// Display all photographer 

router.get('/photographers', (req, res) => {
    photographerModel
    .find()
    .then(photographers => {
        res.render('show-all', {photographers})
    .catch(error => console.log(error));
    })
})


router.get('/photographers/add', (req, res)=> {
    res.render('add-ph');
})

router.post('/photographers/add', (req, res)=> {
  const {name,   description, price, location, email, profil_pictures, portfolio, categories }  = req.body
    photographerModel
    .create({name,   description, price, location, email, profil_pictures, portfolio, categories })
    .then(dbRes => res.redirect("/photographers"))
    .catch(dbErr => {
      console.log(dbErr);
     res.render('add-ph');
})
})


router.get("photographers/:id", (req, res, next ) => {
    photographerModel
    .findById(req.params.id)
    .then(photographer => { 
        res.render("show-each", { photographer });
    })
    .catch(dbErr => console.error("OH no, db err :", dbErr));
})


router.get("/photographers/:id/delete", (req, res, next) => {
    photographerModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
        res.redirect("/photographers");
    })
    .catch(dbErr => console.error("OH no, db err :", dbErr));
})

router.get("/photographers/:id/edit", (req, res, next) => {
    photographerModel
    .findById(req.params.id)
    .then(dbRes => {
      res.render("edit-ph", { photographer: dbRes });
    })
    .catch(dbErr => console.error(dbErr));
});

router.post("/photographers/:id/edit", (req, res, next) => {
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
            res.redirect("/photographers");
        })
        .catch(dbErr => {
            console.error("OH no, db err :", dbErr) 
            res.redirect("/photographers")
            
         } );
    })


