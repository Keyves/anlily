const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const commentSchema = new Schema({
	userid: {
		type: Number,
		ref: 'User'
	},
	index: {
		type: Number,
		default: 1
	},
	username: String,
	reply: Number,
	images: [String],
	text: String,
	createdTime: {
		type: Date,
		default: Date.now
	}
})

module.exports = commentSchema
