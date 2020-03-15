var express         = require('express'),
    passport        = require('passport'),
    noteslists      = require('../models/noteslist'),
    middleware      = require('../middleware/index'),
    router          = express.Router({mergeParams: true});

router.get('/notes', middleware.isLoggedIn,function(req,res){
    noteslists.find({author: {id: req.user._id , username: req.user.username}},function(err,noteslist){
        if(err){
            console.log(err);
        }else{
            res.render('notes/index',{notelists: noteslist.list});
        }
    });
});




module.exports = router;