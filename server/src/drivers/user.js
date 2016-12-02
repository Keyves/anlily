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


const userDriver = {
	/**
	 * 注册
	 * @param  {Object} user 用户信息
	 */
	async register(userinfo) {
		try {
			const { email, password } = userinfo

			const _user = await UserModel.findOne({email})

			if (_user) {
				throw new AuthorizeError('用户已存在')
			} else {
				const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
				const hash = await bcrypt.hash(password, salt)
				userinfo.password = hash
				userinfo.username = await getUniqueUsername()

				const user = new UserModel(userinfo)
				await user.save()
				return user
			}
		} catch(e) {
			e.message = `insert post fail - ${e.message}`
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
				throw new AuthorizeError('用户不存在')
			}
		} catch (e) {
			e.message = `login fail - ${e.message}`
			throw e
		}
	}
}

module.exports = userDriver
