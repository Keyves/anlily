const { Schema, model } = require('mongoose')
const ObjectId = Schema.Types.ObjectId

const commentSchema = new Schema({
	username: {
		type: ObjectId,
		ref: 'User'
	},
	content: String,
	createdTime: Date
})


commentSchema.pre('save', function(next) {
	this.createAt = Date.now()
	next()
})

commentSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({
				_id: id
			})
			.exec(cb)
	}
}

module.exports = model('comment', commentSchema)
