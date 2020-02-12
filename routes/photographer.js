var express = require('express');
var router = express.Router();
const photographerModel = require("../models/Photographer");
const uploader = require("./../config/cloudinary");



// Display all photographer 
router.get("/manage", (req, res, next)=> {
    photographerModel
    .find()
    .then(photographers => {
        res.render("manage-all", {
            photographers,
            css: ['manage.css']
        });
    })
    .catch(dbErr => console.error("OH no, db err :", dbErr))
    })

router.get('/', (req, res) => {
    photographerModel
    .find()
    .then(photographers => {
        res.render('show-all', {
            photographers,
            css : ["show-all.css", "filter.css"]
        })
    }).catch(error => console.log(error));
})


router.get('/add', (req, res)=> {
    res.render('forms/add', {
        css: ['photog-form.css']
    });
})

router.post('/add',uploader.single("profile_picture"), (req, res)=> {
    // console.log(req.files);
    // const files = req.files;
    
    // files.map(file => portfolio.push(file.url));
    
  const photographer  = req.body;
  if (req.file) photographer.profile_picture = req.file.secure_url;
    photographerModel
    .create(photographer)
    .then(dbRes => res.redirect("/photographers"))
    .catch(dbErr => {
      console.log(dbErr);
    })
})



   

router.get("/:id/delete", (req, res, next) => {
    console.log("ici ????", req.params);
    
    photographerModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
        res.redirect("/photographers/manage");
    })
    .catch(dbErr => console.error("OH no, db err :", dbErr));
})

router.get("/:id/edit", (req, res, next) => {
    photographerModel
    .findById(req.params.id)
    .then(dbRes => {
      res.render("forms/editph", { 
          photographer: dbRes ,
          css: ['photog-form.css']
        });
    console.log(dbRes)
    })
    .catch(dbErr => console.error(dbErr));
});

router.post("/:id/edit", (req, res, next) => {
    const {name, description, price, location, email, profile_picture, portfolio, categories }  = req.body
    photographerModel
    .findByIdAndUpdate(req.params.id, {
        name,  
        description, 
        price, 
        location, 
        email, 
        profile_picture, 
        portfolio, 
        categories 
    })
    .then(dbRes => {
            res.redirect("/photographers");
        })
        .catch(dbErr => {
            console.error("OH no, db err :", dbErr) 
            res.redirect("/")
            
         } );
    })
    router.get("/:id/solo", (req, res, next ) => {
        photographerModel
        .findById(req.params.id)
        .then(photographer => { 
            res.render("show-each", { 
                photographer,
                css: ['show-each.css']
            });
        })
        .catch(dbErr => console.error("OH no, db err :", dbErr));
    })
 



    module.exports = router;



