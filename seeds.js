var mongoose = require ("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");

var data = [
        {
            name: "Campng Gunung gede",
            image: "https://www.sabigaju.com/wp-content/uploads/2017/09/Alun-alun-Suryakencana-foto-Instagram-vitriaaprilia_02.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            name: "Camp Gunung Salak",
            image: "https://soc-phoenix.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2017/11/27154728/camping.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            name: "Camp Pondok Halimun",
            image: "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2019/10/camping-di-bogor.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
    ];


function seedDB() {
    //Hapus Semua DB Campgrounds
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } 
        console.log("remove campground");
    });
    //add a few campgrounds
/*     data.forEach(function (seed) {
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("add campground");
                //buat comment
                Comment.create(
                    {
                        text: "Ini Adalah tempat Camping yang sangat indah",
                        author: "giefilth"
                }, function (err, comment) {
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                    }
                }

                );
            }
        });
    }); */
}
 
module.exports =  seedDB;