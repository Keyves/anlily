const {
    isString,
    isArray,
    isNumber,
    isNumberString,
    isEmail,
    isURL,
	isPassword
} = require('../utils/judge')

function checkString(target, message) {
	if (!isString(target)) {
		throw new TypeError(`字符串校验错误 - ${message}`)
	}
}

function checkArray(target, message) {
	if (!isArray(target)) {
		throw new TypeError(`数组校验错误 - ${message}`)
	}
}

function checkNotEmpty(target, message) {
	if (isString(target) || isArray(target)) {
		if (target.length === 0) {
			throw new RangeError(`不应为空 - ${message}`)
		}
	} else {
		throw new TypeError(`请输入字符串或数组类型 - ${message}`)
	}
}

function checkNumber(target, message) {
	if (!isNumber(target)) {
		throw new TypeError(`数字校验错误 - ${message}`)
	}
}

function checkNumberString(target, message) {
	if (!isNumberString(target)) {
		throw new TypeError(`数字字符串校验错误 - ${message}`)
	}
}

function checkEmail(target, message) {
	if (!isEmail(target)) {
		throw new Error(`邮件格式校验错误 - ${message}`)
	}
}

function checkURL(target, message) {
	if (!isURL(target)) {
		throw new Error(`网址格式校验错误 - ${message}`)
	}
}

function checkPassword(target, message) {
	if (!isPassword(target)) {
		throw new Error(`密码格式校验错误 - ${message}`)
	}
}

module.exports = {
	checkArray,
	checkNotEmpty,
	checkNumber,
	checkString,
	checkNumberString,
	checkEmail,
	checkURL,
	checkPassword
}
