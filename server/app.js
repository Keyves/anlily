const Koa = require('koa')
const app = new Koa()
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')
const mongoose = require('mongoose')
const router = require('./app/routers')

// 连接mongodb数据库
mongoose.connect('localhost', 'anlily')
mongoose.connection.on('error', function(err) {
	console.log(err)
})


// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(convert(logger()))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


app.use(router.routes(), router.allowedMethods())
// response

app.on('error', function(err, ctx) {
    console.log(err)
    logger.error('server error', err, ctx)
})


module.exports = app
