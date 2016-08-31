const { Schema, model } = require('mongoose')

const coreSchema = Schema({
	ip: String,
	originalTimestamp: Number,
	localTimestamp: Number
})

module.exports = model('core', coreSchema)
