const { Schema, model } = require('mongoose')

const userSchema = Schema({
	username: String,
	password: String,
	level: Number
})

module.exports = model('user', userSchema)
