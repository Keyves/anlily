const router = require('koa-router')()
const userDriver = require('../drivers/user')
const refine = require('../utils/refine')
const validateUser = require('../validators/user')

const returnKeys = ['username', 'comments', 'createdTime', 'email', 'role', 'messages']

router
.post('/anonymous', async (ctx) => {
	const _user = await userDriver.register()
	ctx.session.user = _user
	ctx.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 90
	ctx.body = refine(_user, returnKeys)
})
.post('/register', async (ctx) => {
	const user = refine(ctx.request.body, ['email', 'password'])

	validateUser(user)
	user.role = 1

	const _user = await userDriver.register(user)
	ctx.session.user = _user
	ctx.body = refine(_user, returnKeys)
})
// 登录
.post('/login', async (ctx) => {
	const user = ctx.request.body

	validateUser(user)

	const _user = await userDriver.login(user)
	ctx.session.user = _user
	ctx.body = refine(_user, returnKeys)
})
// 判断是否登录
.get('/login', async (ctx) => {
	const _user = ctx.session.user

	if (_user) {
		ctx.body = refine(_user, returnKeys)
	} else {
		ctx.status = 404
	}
})
.del('/logout', async (ctx) => {
	ctx.session = null
	ctx.status = 200
})

module.exports = router
