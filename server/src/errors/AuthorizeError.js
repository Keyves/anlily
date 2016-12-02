const BaseError = require('./BaseError')
class AuthorizeError extends BaseError {
	constructor() {
		super(...arguments)
	}
}


module.exports = AuthorizeError
