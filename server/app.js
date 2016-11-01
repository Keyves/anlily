const Koa = require('koa')
const app = new Koa()
const convert = require('koa-convert')
const session = require('koa-session')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')
const mongoose = require('mongoose')
const router = require('./app/routers')
const handleResponse = require('./middlewares/handleResponse')

console.error = (message) => console.log(`\n\x1b[31m${message}\x1b[0m\n`)
console.info = (message) => console.log(`\n\x1b[46m${message}\x1b[0m\n`)

// 连接mongodb数据库
mongoose.connect('localhost', 'anonymous')
mongoose.connection.on('error', (err) => console.log(err))


// middlewares
app.keys = ['session-key']
app.use(convert(session(app)))
app.use(convert(bodyparser))
app.use(convert(json()))

if (process.env.NODE_ENV !== 'test') {
	app.use(convert(logger()))
	app.on('error', (err, ctx) => console.log(`\n\x1b[41m${err}\x1b[0m\n`))
} else {
	app.on('error', () => {})
}

// logger
// app.use(async (ctx, next) => {
// 	const start = new Date()
// 	await next()
// 	const ms = new Date() - start
// 	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

app.use(handleResponse())
app.use(router.routes(), router.allowedMethods())
// response




module.exports = app
