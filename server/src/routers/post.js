const router = require('koa-router')()
const postDriver = require('../drivers/post')
const refine = require('../utils/refine')
const requireRole = require('../utils/requireRole')

router
.get('/', async (ctx) => {
	const category = ctx.query.category
	const posts = await postDriver.findByCategory(category)
	ctx.body = posts
})
.post('/', async (ctx) => {
	const user = ctx.session.user
	const post = refine(ctx.request.body, ['text', 'category', 'images', 'tags'])
console.log('router:', user.userid)
	if (user) {
		post.username = user.username
		post.userid = user._id
	} else {
		post.username = '佚名'
	}
	post.ip = ctx.ip

	const fullPost = await postDriver.insert(post)
	ctx.body = refine(fullPost, ['createdTime', '_id', 'username', 'userid'])
})
.del('/', requireRole(1123), async (ctx) => {
	const postid = ctx.query.postid
	await postDriver.removeByPostid(postid)
	ctx.status = 200
})
.post('/:postid/comment', async (ctx) => {
	const user = ctx.session.user
	const postid = ctx.params.postid
	const comment = refine(ctx.request.body, ['text', 'images', 'tags'])

	if (user) {
		comment.username = user.username
		comment.userid = user._id
		comment.role = 1
	} else {
		comment.username = '佚名'
	}
	comment.ip = ctx.ip

	const fullComment = await postDriver.insertComment(postid, comment)

	ctx.body = refine(fullComment, ['createdTime', '_id', 'username', 'userid'])
})
.del('/:postid/comment', async (ctx) => {
	const user = ctx.session.user

	if (user && user.role === 1123) {
		const postid = ctx.params.postid
		const commentid = ctx.query.commentid
		await postDriver.removeCommentByPostidAndCommentid(postid, commentid)
		ctx.status = 200
	} else {
		throw new Error('权限不足')
	}
})

module.exports = router
