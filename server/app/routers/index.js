const router = require('koa-router')()
const user = require('./user')
const post = require('./post')


router.use('/u', user.routes(), user.allowedMethods())
router.use('/post', post.routes(), post.allowedMethods())

router.get('/', async (ctx) => {
	ctx.body = 'something1'
})

module.exports = router
