module.exports = function(log) {
	return async (ctx, next) => {
		const method = ctx.method
		switch (method.toUpperCase()) {
			case 'POST':
			case 'PUT':
			case 'PATCH':
				log({
					ip: ctx.ip,
					url: ctx.url,
					method: method,
					body: ctx.request.body
				})
				break
			case 'GET':
			case 'DELETE':
			default:
				log({
					ip: ctx.ip,
					url: ctx.url,
					method: method,
					params: ctx.params,
					query: ctx.query
				})
		}
		next()
	}
}
