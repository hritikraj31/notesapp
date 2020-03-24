var express         = require('express'),
    passport        = require('passport'),
    User            = require('../models/user'),
    router          = express.Router({mergeParams: true});

router.get('/',function(req,res){
    // res.send('soon here will be landing page');
    if(req.user)
    res.redirect('/notes');
    else
    res.render('landing');
});

//register get route
router.get('/register',function(req,res){
    res.render('register');
});

//register post route
router.post('/register',function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate('local')(req,res,function(){
            req.flash("success", "Welcome to Notes App "+ user.username);
            res.redirect('/notes');
        });
    });
});

//login get route
router.get('/login', function(req,res,next){
    res.render('login');
});

//login post route
router.post('/login',function(req,res,next){
    passport.authenticate('local',function(err,user){
        if(err){
            return next(err);
        }else if(!user){
            req.flash("error", "Invalid username or password!");
            console.log("invalid username");
            return res.redirect('/login');
        }else {
            req.logIn(user,function(err){
                if(err){
                    return next(err);
                }
                req.flash('success',"Hi "+ user.username+ ". Successfully Logged You in");
                return res.redirect('/notes');
            });
        }
    }
)(req,res,next);
});

router.get('/logout', function(req,res){
    req.logOut();
    req.flash('success',"Successfully logged you out");
    res.redirect('/');
});

module.exports = router;