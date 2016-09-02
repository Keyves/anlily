const router = require('koa-router')()
const userDriver = require('../drivers/user')

router
.get('/', async (ctx) => {
	ctx.body = 'what happened'
})
.post('/', async (ctx) => {
	ctx.body = 'what happened'
})
.put('/', async (ctx) => {

})
.del('/', async (ctx) => {

})
.post('/login', async (ctx) => {
	const user = ctx.request.body
	await userDriver.login(user)
	ctx.body = null
})
.post('/register', async (ctx) => {
	const user = ctx.request.body
	await userDriver.register(user)
	ctx.body = null
})

module.exports = router
