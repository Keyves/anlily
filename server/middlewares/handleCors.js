function handleCors() {
	return async (ctx, next) => {
		try {
			ctx.set({
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
				'Access-Control-Max-Age': '1000'
			})
			await next()
		} catch (e) {
			throw e
		}
	}
}

module.exports = handleCors
