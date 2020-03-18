var mongoose = require('mongoose');


var notesSchema = mongoose.Schema({
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'Users'
    },
    text : String,
    description: String
});


module.exports = mongoose.model('notes', notesSchema);