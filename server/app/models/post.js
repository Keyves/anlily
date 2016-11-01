const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const commentSchema = new Schema({
	userId: {
		type: ObjectId,
		ref: 'User'
	},
	reply: Number,
	username: String,
	images: [String],
	index: Number,
	content: String,
	createdTime: Date
})


const postSchema = new Schema({
	title: String,
	userId: {
		type: ObjectId,
		ref: 'User'
	},
	username: String,
	content: String,
	images: [String],
	tags: [String],
	createdTime: {
		type: Date
	},
	votes: Number,
	comments: [commentSchema]
})

module.exports = mongoose.model('post', postSchema)
