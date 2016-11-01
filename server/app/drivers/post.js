const PostModel = require('../models/post')

const postDriver = {
	async findOne(postId) {
		try {
			const post = await PostModel.findOne({_id: postId})
			if (!post) {
				throw new Error('文章不存在')
			} else {
				return post
			}
		} catch(e) {
			e.message = `find posts fail - ${e.message}`
			throw e
		}
	},

	async find(userId) {
		try {
			const posts = await PostModel.find({userId: userId})
			if (!posts) {
				throw new Error('用户尚未创建文章')
			} else {
				return posts
			}
		} catch(e) {
			e.message = `find posts fail - ${e.message}`
			throw e
		}
	},

	async insert(userId, post) {
		try {
			post.userId = userId
			await new PostModel(post).save()
		} catch(e) {
			e.message = `insert post fail - ${e.message}`
			throw e
		}
	}
}

module.exports = postDriver
