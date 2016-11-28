const Koa = require('koa')
const app = new Koa()
const convert = require('koa-convert')
const session = require('koa-generic-session')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')
const cors = require('koa-cors')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

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

const router = require('./app/routers')
const handleError = require('./middlewares/handleError')


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
	app.use(convert(logger()))
	app.on('error', (err) => console.log(`\n\x1b[41m${err}\x1b[0m\n`))
} else {
	app.on('error', () => {})
}

app.use(handleError())
app.use(router.routes(), router.allowedMethods())
// response

module.exports = app
