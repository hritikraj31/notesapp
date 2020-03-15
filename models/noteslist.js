var mongoose = require('mongoose');

var notesLists = mongoose.Schema({
    author: {
        id: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        username: String
    },
    list : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'notes'
    }]
});


module.exports = mongoose.model('noteslists',notesLists);