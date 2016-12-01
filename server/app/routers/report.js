const router = require('koa-router')()
const refine = require('../utils/refine')
const requireRole = require('../utils/requireRole')


router
.get('/', async (ctx) => {
	ctx.session = null
	ctx.status = 200
})
.post('/', async (ctx) => {
})
.del('/', requireRole(1123), async (ctx) => {

})

module.exports = router
