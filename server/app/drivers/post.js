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
			const fullPost = await new PostModel(post)
			await fullPost.save()
			return fullPost
		} catch(e) {
			e.message = `insert post failed - ${e.message}`
			throw e
		}
	},

	async insertComment(postid, comment) {
		try {
			const fullPost = await PostModel.findOne({_id: postid})
			if (fullPost) {
				const comments = fullPost.comments
				// 获取列表最后一位元素的索引并加1
				comment.index = comments.length > 0 ? comments[comments.length - 1].index + 1 : 1
				comments.push(comment)
				await fullPost.save()

				// 获取由mongoose创建的comment详细信息，如createdTime等
				comment = comments[comments.length - 1]
				const reply = comment.reply
				if (reply) {
					const username = comments[reply]
					const user = await userDriver.findOneByUsername(username)
					if (user) {
						user.comments.push(comment)
						user.save()
					}
				}

				return comment
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
			await PostModel.remove({postid})
		} catch(e) {
			e.message = `delete post failed - ${e.message}`
			throw e
		}
	},

	async removeCommentByPostidAndCommentIndex(postid, commentIndex) {
		try {
			const post = await postDriver.findOneByPostId(postid)
			if (post) {
				post.comments.pull({index: commentIndex})
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
