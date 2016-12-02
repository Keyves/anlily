function isString(target) {
	return typeof target === 'string'
}

function isArray(target) {
	return Object.prototype.toString.apply(target) === '[object Array]'
}

function isNumber(target) {
	return typeof target === 'number'
}

function isNumberString(target) {
	return typeof target === 'string' && !isNaN(target)
}

const EMAIL_REG = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
function isEmail(target) {
	return EMAIL_REG.test(target)
}

const URL_REG = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
function isURL(target) {
	return URL_REG.test(target)
}

// 字母＋数字，或数字＋字母组合
const PASSWORD_REG = /(\w+.*\d+|\d+.*\w+)/
function isPassword(target) {
	return PASSWORD_REG.test(target)
}

module.exports = {
	isString,
	isNumber,
	isNumberString,
	isArray,
	isEmail,
	isURL,
	isPassword
}
