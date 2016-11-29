const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
	userid: {
		type: Number,
		ref: 'User'
	},
	_id: {
		type: Number,
		default: 1
	},
	username: String,
	images: [String],
	text: String,
	createdTime: {
		type: Date,
		default: Date.now
	}
})

module.exports = commentSchema
