const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const ShowSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	targetUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	fromUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
});

module.exports = Show = mongoose.model('Show', ShowSchema);
