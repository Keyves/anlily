const router = require('koa-router')()
const postDriver = require('../drivers/post')
const refine = require('../utils/refine')
const { requireRole } = require('../utils')
const { roles } = require('../../conf')

router
.get('/', async (ctx) => {
	const { category, postid } = ctx.query
	if (category) {
		const posts = await postDriver.findByCategory(category)
		ctx.body = posts
	} else if (postid) {
		const post = await postDriver.findOneByPostid(postid)
		ctx.body = post
	} else {
		ctx.status = 404
	}
})
.post('/', async (ctx) => {
	const user = ctx.session.user
	const post = refine(ctx.request.body, ['text', 'category'])

	post.username = user.username
	post.userid = user._id
	post.ip = ctx.ip

	const fullPost = await postDriver.insert(post)
	ctx.body = refine(fullPost, ['createdTime', '_id', 'username', 'userid'])
})
.del('/', requireRole(roles.SUPER_ADMIN), async (ctx) => {
	const postid = ctx.query.postid
	await postDriver.removeByPostid(postid)
	ctx.status = 200
})
.post('/:postid/comment', async (ctx) => {
	const user = ctx.session.user
	const postid = ctx.params.postid
	const comment = refine(ctx.request.body, ['text', 'images'])

	comment.username = user.username
	comment.userid = user._id
	comment.ip = ctx.ip

	const fullComment = await postDriver.insertComment(postid, comment)
	ctx.body = refine(fullComment, ['createdTime', '_id', 'username', 'userid'])
})
.del('/:postid/comment', requireRole(roles.SUPER_ADMIN), async (ctx) => {
	const postid = ctx.params.postid
	const commentid = ctx.query.commentid
	await postDriver.removeCommentByPostidAndCommentid(postid, commentid)
	ctx.status = 200
})

module.exports = router
