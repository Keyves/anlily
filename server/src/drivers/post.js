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
			const _post = await new PostModel(post).save()

			const message = {
				postid: _post._id,
				from: _post.userid
			}
			_post.text = await noticeUserAndReplaceText(post.text, message, _post.username)
			return await _post.save()
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

				const message = {
					postid,
					commentid: comment._id,
					from: comment.userid
				}
				comment.text = await noticeUserAndReplaceText(comment.text, message, comment.username, comments)
				if (_post.userid !== comment.userid) {
					message.type = 'reply'
					await userDriver.noticeByUsername(comment.username, message)
				}
				// 获取列表最后一位元素的索引并加1
				comment._id = comments.length > 0 ? comments[comments.length - 1]._id + 1 : 1
				comments.push(comment)
				await _post.save()

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


const usernameAtRE = /@([^\s]+)/g
const commentidAtRE = /#(\d+)/g

function atFormat(type, displayText, realText) {
	return [type, '[', displayText, ':', realText, ']'].join('')
}

async function noticeUserAndReplaceText(text, message, ownname, comments) {
	if (!message.postid)
		throw new Error('用户消息来源未知')

	message.type = 'at'

	let _user, comment, result, username, userid, commentid, uMap = {}, cMap = {}

	// 用每一个符合 @ 格式的username匹配userid，并存入Map对象中
	while ((result = usernameAtRE.exec(text))) {
		try {
			username = result[1]
			// 忽略 @ 自己的情况
			if (username !== ownname) {
				_user = await userDriver.noticeByUsername(username, message)
				uMap[username] = _user._id
			}
		} catch(e) {
			console.log(e)
		}
	}

	// 若Map对象中存在对应的username，则按标准格式替换，否则原文
	text = text.replace(usernameAtRE, (str, username) => (userid = uMap[username]) ? atFormat('@', username, userid) : str)

	// 根据楼层号定位用户，获取userid，最后完成替换
	if (comments) {
		while ((result = commentidAtRE.exec(text))) {
			try {
				commentid = result[1]
				comment = comments.id(commentid)
				if (comment) {
					username = comment.username
					if (username !== ownname) {
						_user = await userDriver.noticeByUsername(username, message)
						cMap[commentid] = _user._id
					}
				}
			} catch(e) {
				console.log(e)
			}
		}
		text = text.replace(commentidAtRE, (str, commentid) => (userid = cMap[commentid]) ? atFormat('#', commentid, userid) : str)
	}

	return text
}


module.exports = postDriver
