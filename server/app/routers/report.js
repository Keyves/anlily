const router = require('koa-router')()
const refine = require('../utils/refine')



router
.patch('/', async (ctx) => {

})
.get('/', async (ctx) => {
	ctx.session = null
	ctx.status = 200
})
.post('/', async (ctx) => {
})
.del('/', async (ctx) => {

})

module.exports = router
