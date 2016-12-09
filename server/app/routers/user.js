const router = require('koa-router')()
const userDriver = require('../drivers/user')
const refine = require('../utils/refine')
const validateUser = require('../validators/user')

const returnKeys = ['_id', 'username', 'comments', 'createdTime', 'email', 'role']

router
.post('/anonymous', async (ctx) => {
	const user = await userDriver.register()
	ctx.session.user = user
	ctx.body = refine(user, returnKeys)
})
.post('/register', async (ctx) => {
	const userinfo = refine(ctx.request.body, ['email', 'password'])

	validateUser(userinfo)

	const user = await userDriver.register(userinfo)
	ctx.session.user = user
	ctx.body = refine(user, returnKeys)
})
// 登录
.post('/login', async (ctx) => {
	const userinfo = ctx.request.body

	validateUser(userinfo)

	const user = await userDriver.login(userinfo)
	ctx.session.user = user
	ctx.body = refine(user, returnKeys)
})
// 判断是否登录
.get('/login', async (ctx) => {
	const user = ctx.session.user

	if (user) {
		ctx.body = refine(user, returnKeys)
	} else {
		ctx.status = 404
	}
})
.del('/logout', async (ctx) => {
	console.debug('begin what')
	ctx.session = null
	ctx.status = 200
})

module.exports = router
