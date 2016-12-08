const mongoose = require('mongoose')
const commentSchema = require('./comment')
const autoIncrement = require('mongoose-auto-increment')
const { roles } = require('../../../conf')
const Schema = mongoose.Schema


const userSchema = new Schema({
	username: {
		unique: true,
		type: String,
		required: true
	},
	email: {
		unique: true,
		type: String
	},
	password: String,
	createdTime: {
		type: Date,
		default: Date.now
	},
	// 0: anonymous user
	// 1: register user
	// 1123: super admin
	role: {
		type: Number,
		default: roles.ANONYMOUS
	},
	comments: [commentSchema]
})


userSchema.plugin(autoIncrement.plugin, {
	model: 'user',
	field: '_id',
	startAt: 10000
})

module.exports = userSchema
