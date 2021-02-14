const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	lastLogin: {
		type: Date,
		default: Date.now,
	},
	currentLogin: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model('User', UserSchema);
