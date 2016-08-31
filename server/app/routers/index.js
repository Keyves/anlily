const router = require('koa-router')()
const user = require('./user')
const core = require('./core')
const jvm = require('./jvm')
const task = require('./task')

router.use('/u', user.routes(), user.allowedMethods())
router.use('/jvm', jvm.routes(), jvm.allowedMethods())
router.use('/task', task.routes(), task.allowedMethods())
router.use('/core', core.routes(), core.allowedMethods())

router.post('/', async (ctx, next) => {
})

module.exports = router
