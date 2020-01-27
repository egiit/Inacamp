var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//===========================
//CAMPGROUNDS
//===========================

//INDEX 
router.get("/", function (req, res) { //ini get
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

//Add new Campground to DB
router.post("/", middleware.isLoggedIn, function (req, res) { //ini POST
    //dapatkan data dari form (campground/new) dan tambahkan ke campground array
    var name    = req.body.name //minta isi dari form input name
    var price    = req.body.price //minta isi dari form input price
    var image   = req.body.image //minta isi dari form input image
    var desc    = req.body.description
    var author  = {
                id: req.user._id,
                username: req.user.username
    }
    var newCampground = { name: name, price: price, image: image, description: desc, author: author} // ingatkan perintah dasar nambah object/query
    Campground.create(newCampground, function (err, newCamp) { //masukeun ka database campgrounds
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds"); //redirect/kembalikan ke halaman campgrounds
        }
    });
});

//Page Form Add New Campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//SHOW Campground detail
router.get("/:id", function (req, res) {
    //cari campground berdasarkan id, dan munculkan tamplate detail campground
    Campground.findById(req.params.id).populate("comments").exec(function (err, temukanCampground) {
        if (err) {
            console.log(err);
        } else {
            //tampilkan show
            res.render("campgrounds/show", { campground: temukanCampground });
        }
    });
});

//UPDATE PAGE CAMPGROUNDS
router.get("/:id/edit", middleware.checkCampgroundOwn, function (req, res) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            res.render("campgrounds/edit", { campground: foundCampground });
        });
});

//UPDATE LOGIC CAMPGROUND
router.put("/:id", middleware.checkCampgroundOwn, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
       if (err){
           res.redirect("/campgrounds");
       }  else{
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});


//DELETE ROUTE CAMPGORUNDS
router.delete("/:id", middleware.checkCampgroundOwn, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds")
       }
   }); 
});



//ini untuk mengecek apakah user sudah logi atau blm


module.exports = router;