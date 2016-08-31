const mongoose = require('mongoose')

const jvmSchema = mongoose.Schema({
	max: Number,
	average: Number
})

module.exports = mongoose.model('jvm', jvmSchema)
