const postModel = require('../models/post')

const postDriver = {

	query(username, postid) {
		postModel.find({

		})
	},

	async insert(username, post) {
		try {
			await new postModel(post).save()
		} catch(err) {
			throw `insert post错误${err}`
		}
	}
}
