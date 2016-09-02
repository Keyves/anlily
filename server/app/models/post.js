const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const postSchema = new Schema({
	title: String,
	author: {
		type: ObjectId,
		ref: 'User'
	},
	inAWord: String,
	content: String,
	tags: [String],
	createdTime: {
		type: Date
	},
	votes: Number,
	favorites: Number,
	comments: [{
		username: {
			type: ObjectId,
			ref: 'User'
		},
		content: String,
		createdTime: Date
	}]
})

postSchema.statics = {
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
module.exports = mongoose.model('post', postSchema)
