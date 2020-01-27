var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middleware = require("../middleware");


//ini form untuk comment
router.get("/new", middleware.isLoggedIn, function (req, res) {
    //cari campground berdasarkan id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground }); //ini untuk deklarasi dan koneksi DB di template
        }
    });
});

//ini logic untuk form lihat POST
router.post("/", middleware.isLoggedIn, function (req, res) {
    //lihat ID yang di pakai Campground
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //tambah username dan id untuk commant
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);   //tambah comment baru
                    campground.save();    //connect comment baru dengan campground
                    //console.log(comment);
                    req.flash("Success", "Success add new campground");
                    res.redirect("/campgrounds/" + campground._id);     //redirect campground ke Show page
                }
            });
        }
    });
});


//comment edit page
router.get("/:comment_id/edit", middleware.checkComment, function(req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
 });

 //comment update
router.put("/:comment_id", middleware.checkComment, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
 });

 //Comment destroy or remove
router.delete("/:comment_id", middleware.checkComment, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("/back");
        } else {
            req.flash("success", "Success Deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;