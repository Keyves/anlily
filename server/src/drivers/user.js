const UserModel = require('../models/user')
const bcrypt = require('../utils/bcrypt-promise')
const { AuthorizeError } = require('../errors')

const SALT_WORK_FACTOR = 10


async function getUniqueUsername() {
	// 根据时间生成唯一字符串
	const username = Date.now().toString(36)
	const exists = await UserModel.findOne({username})
	if (exists) {
		return getUniqueUsername()
	} else {
		return username
	}
}

async function getBcryptPassword(password) {
	const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
	const hash = await bcrypt.hash(password, salt)
	return hash
}


const userDriver = {
	/**
	 * 注册
	 * @param  {Object} user 用户信息
	 */
	async register(userinfo) {
		try {
			if (userinfo) {
				const { email, password } = userinfo

				const _user = await UserModel.findOne({email})

				if (_user) {
					throw new AuthorizeError('用户已存在')
				} else {
					userinfo.password = await getBcryptPassword(password)
				}
			} else {
				userinfo = {}
			}
			userinfo.username = await getUniqueUsername()

			return new UserModel(userinfo).save()
		} catch(e) {
			e.message = `register failed - ${e.message}`
			throw e
		}
	},

	/**
	 * 登录
	 * @param  {Object} user 用户信息
	 */
	async login(userinfo) {
		try {
			const { email, password } = userinfo
			const _user = await UserModel.findOne({email})

			if (_user) {
				if (!await bcrypt.compare(password, _user.password)) {
					throw new AuthorizeError('密码错误')
				} else {
					return _user
				}
			} else {
				throw new AuthorizeError('用户不存在', email)
			}
		} catch (e) {
			e.message = `login failed - ${e.message}`
			throw e
		}
	},

	async updatePasswordByUserid(userid, password) {
		try {
			const _user = await UserModel.findOne({_id: userid})

			if (_user) {
				_user.password = await getBcryptPassword(password)
				return await _user.save()
			} else {
				throw new AuthorizeError('用户不存在', userid)
			}
		} catch (e) {
			e.message = `update failed - ${e.message}`
			throw e
		}
	},

	async noticeByUsername(username, message) {
		try {
			const _user = await UserModel.findOne({username})
			if (_user) {
				_user.messages.push(message)
				return await _user.save()
			} else {
				throw new Error('该用户不存在', username)
			}
		} catch(e) {
			e.message = `notice failed - ${e.message}`
			throw e
		}
	}
}

module.exports = userDriver
