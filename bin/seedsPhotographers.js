const photographerModel = require("./../models/Photographer")
const mongoose = require(`mongoose`)

mongoose.connect("mongodb://localhost/project2", {useNewUrlParser: true});



const photographers = [
    {
        name : "Thierry Van Biesen",
        description: "As a teenager in Beirut, Lebanon, when his friends picked up guns, Thierry picked up a camera. This high school math teacher turned European high fashion photographer has collaborated with everyone from Moebius (who illustrated a series over his photographs) and Lagerfeld (who designed a special pair of color shoes in his black and white collection, just for a Thierry photo) to Old Navy, Kate Spade, and Cirque de Soleil (who sent a team of acrobats into the desert with Thierry for a weekend).",	
        price : 1500,
        portfolio : ["/images/Photographers-Pictures/Thierry-Van-Biesen/TVB1.png", "images/Photographers-Pictures/Thierry-Van-Biesen/TVB2.png", "images/Photographers-Pictures/Thierry-Van-Biesen/TVB3.png", "images/Photographers-Pictures/Thierry-Van-Biesen/TVB4.png", "images/Photographers-Pictures/Thierry-Van-Biesen/TVB5.png", "images/Photographers-Pictures/Thierry-Van-Biesen/TVB6.png"],
        categories : ["advertising", "portrait"],	
        email : "tvb@gmail.com",
        location : "Paris",
        profile_picture	: "/images/Photographers-Pictures/Thierry-Van-Biesen/profilepic/tvbPp.png",
        reviews	: ["TVB is an awesome photographer"]

    },
     {
         name : "Anais Da Silva",
         description : "Fashion Photographer based in Paris Half of @anami.studio  #photographer #artdirector",
         price : 800,
         portfolio : ["/images/Photographers-Pictures/Anais-Da-Silva/ADS1.png", "/images/Photographers-Pictures/Anais-Da-Silva/ADS2.png", "/images/Photographers-Pictures/Anais-Da-Silva/ADS3.png", "/images/Photographers-Pictures/Anais-Da-Silva/ADS4.png", "/images/Photographers-Pictures/Anais-Da-Silva/ADS5.png", "/images/Photographers-Pictures/Anais-Da-Silva/ADS6.png"],
         categories : ["advertising", "portrait", "packshots & still life"],
         email : "contact@anaisdasilva.fr",
         location : "Paris",
         profile_picture : "/images/Photographers-Pictures/Anais-Da-Silva/profilepic/ADS-Pp.png",
         reviews : ["Anais is an awesome photographer"]
     },
     {
         name : "Amy Ta",
         description : "Photographer / Video Maker based in Paris, Sport addict",
         price : 1000,
         portfolio : ["/images/Photographers-Pictures/Amy-Ta/AT1.png", "/images/Photographers-Pictures/Amy-Ta/AT2.png", "/images/Photographers-Pictures/Amy-Ta/AT3.png", "/images/Photographers-Pictures/Amy-Ta/AT4.png", "/images/Photographers-Pictures/Amy-Ta/AT5.png", "/images/Photographers-Pictures/Amy-Ta/AT6.png", "/images/Photographers-Pictures/Amy-Ta/AT7.png"],
         categories : ["packshots & still life"],
         email : "amyta@gmail.com",
         location : "Paris",
         profile_picture : "/images/Photographers-Pictures/Amy-Ta/profilepic/AT-Pp.png",
         reviews : ["Amy is an awesome photographer"]

     },
     {
         name : "Jean Sébastien Poirier",
         description : "My name is Jean-Sébastien Poirier, born and raised Parisian photographer. Being an unstoppable world traveler has served me well over the years for 3 main reasons : It has developed my curiosity for the people, the places and the image itself. There is just no better photography school (no offence to those with fancy diplomas). It allowed me to come up with the cool name Nomadist Moon, pretty sweet huh ? Witnessing so many of the world's wonders has opened my eyes to the true beauty of my city which I love to my core : Paris ! I am now a dedicated couple photographer and through my lens, I want to share my views of the city. Love is a great source of inspiration, it deserves to be immortalized in a unique way in such a unique place.I'm still in the learning process and don't intend to stop until I'm too weak to hold my camera, if that's all you ever know about me, it's enough to say you know me well.",
         price : 500,
         portfolio : ["/images/Photographers-Pictures/Jean-Sébastien-Poirier/JSP1.png", "/images/Photographers-Pictures/Jean-Sébastien-Poirier/JSP2.png", "/images/Photographers-Pictures/Jean-Sébastien-Poirier/JSP3.png", "/images/Photographers-Pictures/Jean-Sébastien-Poirier/JSP4.png", "/images/Photographers-Pictures/Jean-Sébastien-Poirier/JSP5.png", "/images/Photographers-Pictures/Jean-Sébastien-Poirier/JSP6.png", "/images/Photographers-Pictures/Jean-Sébastien-Poirier/JSP7.png"],
         categories : ["real estate"],
         email : "jbp@gmail.com",
         location : "Paris",
         profile_picture : "/images/Photographers-Pictures/Jean-Sébastien-Poirier/profilepic/JSP-Pp.jpg",
         reviews : ["JSP is an awesome photographer"]
     },
    //  {
    //      name : "Caspar Miskin",
    //      description : "Former chef de cuisine now turned photographer, specialized in working with gastronomy. With my Scandinavian background, then i am inspired by simplicity and minimalism which often translates into my work. Now based in Paris where i am currently working as a freelance",
    //      price : 800
    //      portfolio :
    //      categories : ["food", "packshots & still life", "advertising"],
    //      email : "casparm@gmail.com",
    //      location : "Paris",
    //      profile_picture : 
    //      reviews : 
    //  },
    //  {
    //      name : "Nora Hegedus",
    //      description : "Nora Hegedüs is a Franco-Hungarian photographer and director who graduated from the French Louis-Lumière college. Practicing staged photography, she shows deep interest in social issues, especially in issues concerning women’s status. She has been working on interaction between photography, video and music for a while and she regularly cooperates with musicians.",
    //      price : 600
    //      portfolio : 
    //      categories : ["portrait"],
    //      email : "nora@gmail.com",
    //      location : "Paris",
    //      profile_picture :
    //      reviews :
    //  },
    //  {
    //      name : "Klaudia Iga Peres",
    //      description :" I'm a food and lifestyle photographer living in Guebwiller with broad experience from editorial and commercial work, both domestic and international. With a Masters in Fine Art I seek to bring out appetizing and esthetic features in my work. My passion for photography has been cultivated over the last 12 years and I find inspiration from all around me."
    //      price : 800
    //      portfolio :
    //      categories : ["food"],
    //      email : "kaludiaIga@gmail.com",
    //      location : "Paris",
    //      profile_picture :
    //      reviews :
    //  }
]


function insertPhotographer() {
    photographerModel.insertMany(photographers)
      .then(dbRes => console.log(dbRes))
      .catch(dbErr => console.log(dbErr));
  }
  insertPhotographer();