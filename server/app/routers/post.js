const router = require('koa-router')()
const postDriver = require('../drivers/post')
const commentDriver = require('../drivers/comment')

router
.get('/', async (ctx) => {
	const posts = await postDriver.find()
	this.body = posts
})
.get('/:postId', async (ctx) => {
	const postId = ctx.params.postId
	const post = await postDriver.findOne(postId)
	this.body = post
})
.post('/', async (ctx) => {
	const post = ctx.request.body
	const userId = ctx.session.user._id

	await postDriver.insert(userId, post)
	this.status = 201
})
.patch('/', async (ctx) => {
	this.status = 201
})
.put('/', async (ctx) => {
	const post = ctx.request.body
	const postId = ctx.params.postId
	await postDriver.update(postId, post)
	this.status = 201
})
.del('/:postId', async (ctx) => {
	const post = ctx.request.body
	const postId = ctx.params.postId
	await postDriver.remove(postId, post)
	this.status = 204
})
.post('/:postId/comment', async (ctx) => {
	const comment = ctx.request.body
	const postId = ctx.params.postId
	await commentDriver.insert(postId, comment)
	this.status = 201
})

module.exports = router
