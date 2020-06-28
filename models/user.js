var mongoose = require('mongoose');
var passportlocalmongoose = require('passport-local-mongoose');
var user = mongoose.Schema({
	username: String,
	password: String,
});

user.plugin(passportlocalmongoose);
module.exports = mongoose.model('User', user);
