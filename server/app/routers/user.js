const router = require('koa-router')()
const userDriver = require('../drivers/user')
const refine = require('../utils/refine')
const validateUser = require('../validators/user')

router
.patch('/', async (ctx) => {

})
.get('/logout', async (ctx) => {
	ctx.session = null
	ctx.status = 200
})
.get('/login', async (ctx) => {
	const user = ctx.session.user
	if (user) {
		ctx.body = refine(user, ['username', 'comments', 'createdTime', 'email', 'followers', 'following'])
	} else {
		ctx.status = 404
	}
})
.post('/login', async (ctx) => {
	const userinfo = ctx.request.body

	validateUser(userinfo)

	const user = await userDriver.login(userinfo)
	ctx.session.user = user
	ctx.status = 200
})
.post('/register', async (ctx) => {
	const userinfo = refine(ctx.request.body, ['email', 'password'])

	validateUser(userinfo)

	const user = await userDriver.register(userinfo)
	ctx.session.user = user
	ctx.status = 201
})

module.exports = router
