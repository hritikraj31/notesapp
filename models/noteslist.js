var mongoose = require('mongoose');

var notesLists = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
	},
	list: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'notes',
			},
			description: String,
		},
	],
});

module.exports = mongoose.model('noteslists', notesLists);
