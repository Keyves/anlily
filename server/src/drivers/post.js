const PostModel = require('../models/post')
const userDriver = require('./user')
const NotFoundError = require('../errors/NotFoundError')

const postDriver = {
	async findOneByPostid(postid) {
		try {
			const post = await PostModel.findOne({_id: postid})
			if (post) {
				return post
			} else {
				throw new NotFoundError('该文章不存在')
			}
		} catch(e) {
			e.message = `find post failed - ${e.message}`
			throw e
		}
	},

	async findByUserName(username) {
		try {
			const posts = await PostModel.find({username})
			if (posts && posts.length > 0) {
				return posts
			} else {
				throw new NotFoundError('用户尚未创建文章')
			}
		} catch(e) {
			e.message = `find posts failed - ${e.message}`
			throw e
		}
	},

	async findByCategory(category) {
		try {
			const posts = await PostModel.find({category})
			if (posts && posts.length > 0) {
				return posts
			} else {
				throw new NotFoundError('该分类下尚未创建文章')
			}
		} catch(e) {
			e.message = `find posts failed - ${e.message}`
			throw e
		}
	},

	async insert(post) {
		try {
			return await new PostModel(post).save()
		} catch(e) {
			e.message = `insert post failed - ${e.message}`
			throw e
		}
	},

	async insertComment(postid, comment) {
		try {
			const _post = await PostModel.findOne({_id: postid})
			if (_post) {
				const comments = _post.comments
				// 获取列表最后一位元素的索引并加1
				comment._id = comments.length > 0 ? comments[comments.length - 1]._id + 1 : 1
				comments.push(comment)
				await _post.save()

				// [#Number ]
				const reg = /#(\d+)\s/
				const result = reg.exec(comment.text)
				if (result) {
					const reply = result[1]
					const username = comments[reply].username
					const user = await userDriver.findOneByUsername(username)
					if (user) {
						user.comments.push(comment)
						user.save()
					}
				}

				// 获取由mongoose创建的comment详细信息，如createdTime等
				const _comment = comments[comments.length - 1]

				return _comment
			} else {
				throw new NotFoundError('被评论的文章不存在')
			}
		} catch(e) {
			e.message = `insert comment failed - ${e.message}`
			throw e
		}
	},

	async removeByPostid(postid) {
		try {
			await PostModel.remove({_id: postid})
		} catch(e) {
			e.message = `delete post failed - ${e.message}`
			throw e
		}
	},

	async removeCommentByPostidAndCommentid(postid, commentid) {
		try {
			const post = await postDriver.findOneByPostid(postid)
			if (post) {
				post.comments.pull({_id: commentid})
				await post.save()
			} else {
				throw new NotFoundError('不存在该文章')
			}
		} catch(e) {
			e.message = `remove comment failed - ${e.message}`
			throw e
		}
	}
}

module.exports = postDriver
