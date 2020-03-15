var express        = require('express'),
    indexRoute     = require('./routes/index'),
    bodyparser     = require('body-parser'),
    methodOverride = require('method-override'),
    User           = require('./models/user'),
    passport       = require('passport'),
    notes          = require('./routes/notes'),
    mongoose       = require('mongoose'),
    LocalStrategy  = require('passport-local');
    flash          = require('connect-flash'),
    app            = express();

app.set('view engine','ejs');
app.use(methodOverride('_method'));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is some text",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/notesapp',{useUnifiedTopology: true,useNewUrlParser:true , useFindAndModify: true});

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/assets'));
app.use(bodyparser.urlencoded({extended : true}));
app.use(flash());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash('success');
    next();
});
app.use(indexRoute);
app.use(notes);


process.env.PORT = process.env.PORT || 3000;
app.listen(process.env.PORT ,process.env.IP,function(){
    console.log("NotesApp Server has started...")
});