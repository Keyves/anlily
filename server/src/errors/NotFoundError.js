const BaseError = require('./BaseError')
class NotFoundError extends BaseError {
	constructor() {
		super(...arguments)
	}
}


module.exports = NotFoundError
