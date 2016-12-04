const mongoose = require('mongoose')
const commentSchema = require('./comment')
const autoIncrement = require('mongoose-auto-increment')

const Schema = mongoose.Schema

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
	images: [String],
	category: String,
	tags: [String],
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
