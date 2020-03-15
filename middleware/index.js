var notes    = require('../models/notes'),
    noteslists = require('../models/noteslist');
var middleWareObj ={};



middleWareObj.isLoggedIn  = function(req,res,next){
    if(req.user){
        return next();
    }
    if(req.isAuthenticated()){
        req.flash("success", "Successfully logged in. Nice to meet you "+ req.user.username);
        return next();
    }
    req.flash("error","You need to be logged in to do that.")
    res.redirect('/login');
};



module.exports = middleWareObj;