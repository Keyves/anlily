// class BaseError extends Error {
// 	constructor() {
// 		super(...arguments)
// 		this.name = this.constructor.name
//
// 		if (typeof Error.captureStackTrace === 'function') {
// 			Error.captureStackTrace(this, this.constructor)
// 		} else {
// 			this.stack = (new Error(...arguments)).stack
// 		}
// 	}
// }

function BaseError(message) {
	this.name = this.constructor.name
	this.message = message
	if (typeof Error.captureStackTrace === 'function') {
		Error.captureStackTrace(this, this.constructor)
	} else {
		this.stack = (new Error(...arguments)).stack
	}
}
BaseError.prototype = Object.create(Error.prototype)
BaseError.prototype.constructor = BaseError

module.exports = BaseError
