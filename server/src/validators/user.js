const { AuthorizeError } = require('../errors')
const validate = require('./validate')


module.exports = function validateUser(user) {
	try {
		validate.checkEmail(user.email, '用户邮箱')
		validate.checkPassword(user.password, '用户密码')
		user.avator && validate.checkURL(user.avator)
	} catch(e) {
		throw new AuthorizeError(e.message)
	}
}
