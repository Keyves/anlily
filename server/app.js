const Koa = require('koa')
const app = new Koa()
const convert = require('koa-convert')
const session = require('koa-generic-session')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')()
const cors = require('koa-cors')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const bunyan = require('bunyan')
const { AuthorizeError } = require('./src/errors')

console.error = console.debug = function() {
	console.log.apply(console, ['\n\x1b[31m', ...Array.prototype.slice.apply(arguments).map(v => v && typeof v === 'object' ? JSON.parse(JSON.stringify(v)) : v), '\x1b[0m\n'])
}

// console.info = (message) => console.log('\n\x1b[46m', message, '\x1b[0m\n')

const NAME = 'anonymous'

// 连接mongodb数据库
mongoose.Promise = global.Promise
mongoose.connect('127.0.0.1', NAME)
mongoose.connection.on('error', (err) => console.log(err))
autoIncrement.initialize(mongoose.connection)

const router = require('./src/routers')
const handleError = require('./middlewares/handleError')
const handleLog = require('./middlewares/handleLog')


// middlewares
app.keys = ['session-key']
app.use(convert(session({
    cookie: {
        maxage: 1000 * 60 * 60 * 24 * 7
    }
})))
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(convert(cors({
	credentials: true
})))

if (process.env.NODE_ENV !== 'test') {
	const logger = bunyan.createLogger({name: NAME})
	app.use(handleLog(logger.info.bind(logger)))
	app.on('error', logger.error.bind(logger))
} else {
	app.on('error', () => {})
}

function allowedUrls(urls) {
	return urls.indexOf(this.url) > -1
}

app.use(async (ctx, next) => {
	const user = ctx.session.user
console.log(ctx.method, ctx.url, ctx.cookie, user && user.email)
	if (allowedUrls.call(ctx, ['/u/register', '/u/login', '/u/anonymous']) || user) {
		await next()
	} else {
		throw new AuthorizeError('未登录')
	}
})
app.use(handleError())
app.use(router.routes(), router.allowedMethods())
// response

module.exports = app
