const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({
	suspectid: {
		type: Number,
		ref: 'User'
	},
	reporterid: {
		type: Number,
		ref: 'User'
	},
	postid: {
		type: Number,
		ref: 'Post'
	},
	// ['色情', '辱骂', '广告', '其它']
	type: String,
	description: String,
	createdTime: {
		type: Date,
		default: Date.now
	}
})

module.exports = reportSchema
