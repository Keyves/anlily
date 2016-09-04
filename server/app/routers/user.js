const router = require('koa-router')()
const userDriver = require('../drivers/user')

router
.get('/', async (ctx) => {
	console.log(ctx.session.user)
})
.post('/', async (ctx) => {
	ctx.body = 'what happened'
})
.put('/', async (ctx) => {

})
.del('/', async (ctx) => {

})
.post('/login', async (ctx) => {
	const userinfo = ctx.request.body
	const user = await userDriver.login(userinfo)
	ctx.session.user = user
	console.log(ctx.session.user)
	ctx.body = null
})
.post('/register', async (ctx) => {
	const userinfo = ctx.request.body
	const user = await userDriver.register(userinfo)
	ctx.session.user = user
	ctx.body = null
})

module.exports = router
