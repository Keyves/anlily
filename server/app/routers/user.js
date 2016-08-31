var router = require('koa-router')()

router
.get('/', async (ctx, next) => {
    ctx.body = 'this a users response!'
})

module.exports = router
