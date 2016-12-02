const PostModel = require('../models/post')
const userDriver = require('./user')

const postDriver = {
	async findOneByPostid(postid) {
		try {
			const post = await PostModel.findOne({_id: postid})
			if (!post) {
				throw new Error('该文章不存在')
			} else {
				return post
			}
		} catch(e) {
			e.message = `find post failed - ${e.message}`
			throw e
		}
	},

	async findByUserName(username) {
		try {
			const posts = await PostModel.find({username})
			if (!posts) {
				throw new Error('用户尚未创建文章')
			} else {
				return posts
			}
		} catch(e) {
			e.message = `find posts failed - ${e.message}`
			throw e
		}
	},

	async findByCategory(category) {
		try {
			const posts = await PostModel.find({category})
			if (!posts) {
				throw new Error('该分类下尚未创建文章')
			} else {
				return posts
			}
		} catch(e) {
			e.message = `find posts failed - ${e.message}`
			throw e
		}
	},

	async insert(post) {
		try {
			const _post = await new PostModel(post)
			await _post.save()
			return _post
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
				throw new Error('被评论的文章不存在')
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
				throw new Error('不存在该文章')
			}
		} catch(e) {
			e.message = `remove comment failed - ${e.message}`
			throw e
		}
	}
}

module.exports = postDriver
