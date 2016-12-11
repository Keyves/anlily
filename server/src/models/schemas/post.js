const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

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
	text: String,
	tokens: [Mixed],
	createdTime: {
		type: Date,
		default: Date.now
	}
})

const postSchema = new Schema({
	userid: {
		type: Number,
		ref: 'User'
	},
	username: {
		type: String,
		ref: 'User'
	},
	ip: String,
	text: String,
	tokens: [Mixed],
	category: String,
	locked: Boolean,
	createdTime: {
		type: Date,
		default: Date.now
	},
	comments: [commentSchema]
})

postSchema.plugin(autoIncrement.plugin, {
	model: 'post',
	field: '_id',
	startAt: 10000
})

module.exports = postSchema
