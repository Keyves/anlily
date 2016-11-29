const mongoose = require('mongoose')
const commentSchema = require('./comment')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
	username: {
		unique: true,
		type: String
	},
	email: {
		unique: true,
		type: String
	},
	password: String,
	avator: String,
	followers: [{
		type: Number,
		ref: 'User'
	}],
	following: [{
		type: Number,
		ref: 'User'
	}],
	createdTime: {
		type: Date,
		default: Date.now
	},
	// 0: nomal user
	// 1: verified user
	// 2: professonal user
	// >10: admin
	// 1123: super admin
	role: {
		type: Number,
		default: 0
	},
	comments: [commentSchema]
})


userSchema.plugin(autoIncrement.plugin, {
	model: 'user',
	field: '_id',
	startAt: 10000
})

module.exports = userSchema
