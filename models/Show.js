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
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	fromUser: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

module.exports = Show = mongoose.model('Show', ShowSchema);
