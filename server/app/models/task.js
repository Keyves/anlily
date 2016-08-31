const { Schema, model } = require('mongoose')

const taskSchema = Schema({
	max: Number,
	average: Number
})

module.exports = model('task', taskSchema)
