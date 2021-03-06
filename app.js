var express     = require("express"), //Declarasi atau SETUP Express
    app         = express(),  //convert Express ke app
    bodyParser  = require("body-parser"), //Declarasi atau SETUP Body Parser
    mongoose    = require("mongoose"), //Declarasi atau SETUP Moongose
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStartegy = require("passport-local"),
    methodOverride = require ("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comments"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

//folder models untuk schema db
//folder routes untuk routing halaman dan logic

    //requaring riute / kebutuhan route
var commentRoutes =  require("./routes/comments");   
    campgroundRoutes = require("./routes/campgrounds");
    indexRoutes       = require("./routes/index");
    //seed db
   /*  seedDB(); */

//PASSPORT KONFIGURASI
app.use(require("express-session")({
        secret: "Ini Halaman Rahasia",
        resave: false,
        saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStartegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/public', express.static('public'));
app.use(methodOverride("_method"));
//mongoose.connect('mongodb://localhost/ina_camp_v11', 
//                 {  'useNewUrlParser': true, 
//                    'useUnifiedTopology': true,
 //                    'useFindAndModify': false,
//                     'useCreateIndex': true
//                 }); //connetion DB ke MongoDB dengan menggunakan layer Mongoose */

var URI =  process.env.DATABASEURL //database env

mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
    }).then(() => {
        console.log('DB Connected....');
    }).catch(err => {
        console.log(err.message);
    });



app.use(bodyParser.urlencoded({extended: true})); //Body Parser setting
app.set("view engine", "ejs"); //setup ejs

app.use(function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});

app.set('port', (process.env.PORT || 3000));

app.use("/", indexRoutes).listen(app.get('port'), function() {
    console.log('Inacamp Hurung cuy Port na make Port ', app.get('port'));
});
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



//app.listen(3000, console.log("YelpCamp Hurung Cuy.."));