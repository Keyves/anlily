const router = require('koa-router')()
const user = require('./user')
const post = require('./post')
const report = require('./report')

router.use('/report', report.routes(), report.allowedMethods())
router.use('/u', user.routes(), user.allowedMethods())
router.use('/post', post.routes(), post.allowedMethods())

module.exports = router
