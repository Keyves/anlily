const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
	username: {
		unique: true,
		type: String
	},
	password: String,
	nickname: String,
	avator: String,
	email: String,
	followers: [{
		type: ObjectId,
		ref: 'User'
	}],
	following: [{
		type: ObjectId,
		ref: 'User'
	}],
	createdTime: Date,
	// 0: nomal user
	// 1: verified user
	// 2: professonal user
	// >10: admin
	// >50: super admin
	role: {
		type: Number,
		default: 0
	}
})

module.exports = mongoose.model('user', userSchema)
