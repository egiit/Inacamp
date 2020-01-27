var express = require("express");
var router = express.Router();
var passport = require("passport");
var User =  require ("../models/user")
var Campground = require("../models/campground");

//Landing
router.get("/", function (req, res) { //ini get
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("landing", { campgrounds: allCampgrounds });
        }
    });
});



//register form
router.get("/register", function (req, res) {
    res.render("register");
});

//logic register
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Wellcome to Yelpcamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//login form
router.get("/login", function (req, res) {
    res.render("login");
});

//logic Login
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {
    });

//logout
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You Logged Out");
    res.redirect("/campgrounds");
});



module.exports = router;