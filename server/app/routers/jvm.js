const router = require('koa-router')()
const JVM = require('../models/JVM')

router
.get('/', async (ctx, next) => {

})
.post('/', async (ctx, next) => {
	const data = ctx.req.body

	const jvm = new JVM(data)
	await jvm.save()
})

module.exports = router
