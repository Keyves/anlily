const { AuthorizeError } = require('../app/errors')


function handleError() {
	return async (ctx, next) => {
		try {
			await next()
			if (ctx.status === 200)
				ctx.body = {
					code: 0,
					message: '成功',
					data: ctx.body
				}
		} catch (e) {
			switch (e.constructor) {
				case RangeError:			// 超出取值范围错误
				case SyntaxError:			// 语法错误
				case TypeError:				// 类型错误
					ctx.status = 400
					break
				case URIError:				// 地址错误
					ctx.status = 404
					break
				case AuthorizeError:		// 用户认证错误
					ctx.status = 401
					break
				case EvalError:				// 顶层的eval函数错误
				case ReferenceError:		// 引用错误
				default:
					ctx.status = 500
			}
			ctx.body = {
				code: ctx.status,
				message: e.message || '服务器错误'
			}
			ctx.app.emit('error', e.message, this)
		}
	}
}

module.exports = handleError
