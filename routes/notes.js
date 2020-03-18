var express         = require('express'),
    passport        = require('passport'),
    noteslists      = require('../models/noteslist'),
    notes           = require('../models/notes'),
    middleware      = require('../middleware/index'),
    router          = express.Router({mergeParams: true});

router.get('/', middleware.isLoggedIn,function(req,res){
    noteslists.findOne({author:  req.user._id },function(err,noteslist){
        if(err){
            console.log(err);
            er(req,res);
        }else{
            if(noteslist)
            res.render('notes/index',{notelists: noteslist.list});
            else
            res.render('notes/index',{notelists: noteslist});
        }
    });
});

//new get Route
router.get('/new',middleware.isLoggedIn , function(req,res){
    res.render('notes/new');
});

//new post route
router.post('/',middleware.isLoggedIn,middleware.isEmptyNote, function(req,res){
    var newNote= {
        author : req.user.id,
        text : req.body.note.text,
        description : req.body.note.description
    };
    notes.create(newNote,function(err,note){
        if(err){
            console.log(err);
            er(req,res);
        }else{
            noteslists.find({author: req.user._id},function(err,notelist){
                if(err){
                    console.log(err);
                    er(req,res);
                }else if(!(notelist.length> 0)){
                    console.log(!(notelist.length>0));
                    var list = [
                        {
                            id: note.id,
                            description: note.description
                        }
                    ];
                    noteslists.create({author: req.user._id,list: list},function(err,createNotelist){
                        if(err){
                            console.log(err);
                            er(req,res);
                        }else{
                            res.redirect('/notes');
                        }
                    });
                }else{
                    console.log("here");
                    noteslists.findOne({author: req.user._id},function(err,note1){
                        if(err){
                            console.log(err);
                            er(req,res);
                        }else{
                            note1.list.push({
                                id: note._id,
                                description: note.description
                            });
                            
                            note1.save(function(err){if(err)console.log(err);});
                            res.redirect('/notes');
                        }
                    });
                }
            });
        }
    });
});

//Edit Get Route
router.get('/:id/edit',middleware.isLoggedIn,function(req,res){
    notes.findById(req.params.id,function(err,note){
        if(err){
            console.log(err);
            er(req,res);
        }else{
            res.render('notes/edit',{note: note});
        }
    });
});

//Edit Put Route
router.put('/:id',middleware.isLoggedIn, middleware.isEmptyNote, function(req,res){
    notes.findByIdAndUpdate(req.params.id,req.body.note, function(err,note){
        if(err){
            console.log(err);
            er(req,res);
        }else{
            noteslists.findOne({author: req.user._id},function(err,notelist){
                if(err){console.log(err); er(req,res);}
                else{
                    for(var i=0;i<notelist.list.length ;i++){
                        if(notelist.list[i].id.equals(note._id)){
                            notelist.list[i].description= req.body.note.description;
                        }
                    }
                    notelist.save(function(err){
                        if(err){console.log(err); er(req,res);}
                        else{
                            res.redirect('/notes');
                        }
                    });
                }
            });
        }
    });
});

//Delete Route
router.delete('/:id',middleware.isLoggedIn,function(req,res){
    notes.findByIdAndDelete(req.params.id,function(err,deleteNote){
        if(err){
            console.log(err);
            er(req,res);
        }else{
            noteslists.findOne({author: req.user._id},function(err,notelist){
                if(err){console.log(err); er(req,res);}
                else{
                    notelist.list = notelist.list.filter(function(a){return !(a.id.equals(req.params.id))});
                    notelist.save(function(err){if(err){console.log(err); er(req,res);}});
                    res.redirect('/notes');
                }
            });
        }
    });
});

//Show Route
router.get('/:id',middleware.isLoggedIn,function(req,res){
    notes.findById(req.params.id, function(err,note){
        if(err){
            console.log(err);
            er(req,res);
        }else{
            res.render('notes/show',{note: note});
        }
    });
});

function er(req,res){
    req.flash("error","Something went wrong.");
    res.redirect('/');
}
module.exports = router;