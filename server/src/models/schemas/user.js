const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const { roles } = require('../../../conf')
const Schema = mongoose.Schema

const messageSchema = new Schema({
	from: {
		type: Number,
		ref: 'User'
	},
	// reply
	// favour
	// collect
	// at
	type: {
		type: String,
		required: true
	},
	postid: {
		type: Number,
		ref: 'User'
	},
	commentid: {
		type: Number,
		ref: 'Comment'
	}
})

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
	locked: {
		type: Boolean,
		default: false
	},
	// 0: anonymous user
	// 1: register user
	// 1123: super admin
	role: {
		type: Number,
		default: roles.ANONYMOUS
	},
	messages: [messageSchema]
})


userSchema.plugin(autoIncrement.plugin, {
	model: 'user',
	field: '_id',
	startAt: 100000
})

module.exports = userSchema
