const router = require('koa-router')()
const postDriver = require('../drivers/post')
const refine = require('../utils/refine')

router
.get('/', async (ctx) => {
	const category = ctx.query.category
	const posts = await postDriver.findByCategory(category)
	ctx.body = posts
})
.post('/', async (ctx) => {
	const user = ctx.session.user
	const post = refine(ctx.request.body, ['text', 'category', 'images', 'tags'])

	if (user) {
		post.username = user.name
		post.userid = user._id
	} else {
		post.username = '佚名'
	}
	post.ip = ctx.ip

	const fullPost = await postDriver.insert(post)
	ctx.body = refine(fullPost, ['index', 'createdTime', '_id'])
})
.del('/:postid', async (ctx) => {
	const user = ctx.session.user

	if (user && user.role === Infinity) {
		const postid = ctx.params.postid
		await postDriver.remove(postid)
		ctx.status = 204
	} else {
		throw new Error('权限不足')
	}

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

	// [#Number ]
	const reg = /#(\d+)\s/
	const result = reg.exec(comment.text)

	if (result) {
		comment.reply = result[1]
	}

	const fullComment = await postDriver.insertComment(postid, comment)

	ctx.body = refine(fullComment, ['createdTime', 'reply', 'index'])
})

module.exports = router
