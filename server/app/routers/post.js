const router = require('koa-router')()
const postDriver = require('../drivers/post')

router
.get('/', async (ctx) => {
	const user = ctx.session.user
	this.data = await postDriver.find(user)
})
.get('/:postid', async (ctx) => {

})
.post('/', async (ctx) => {
	const post = ctx.request.body
	const user = ctx.session.user
	await postDriver.insert(user, post)
})
.patch('/', async (ctx) => {

})
.put('/', async (ctx) => {
	const post = ctx.request.body
	const user = ctx.session.user
	await postDriver.update(user, post)
})
.del('/', async (ctx) => {
	const post = ctx.request.body
	const user = ctx.session.user
	await postDriver.delete(user, post)
})

module.exports = router
