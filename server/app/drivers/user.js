const UserModel = require('../models/user')
const bcrypt = require('../utils/bcrypt-promise')
const { AuthorizeError } = require('../errors')
const SALT_WORK_FACTOR = 10

const userDriver = {

	/**
	 * 查找用户
	 * @param  {String} username 用户名
	 */
	async findOne(username) {
		return await UserModel.findOne({username})
	},

	/**
	 * 注册
	 * @param  {Object} user 用户信息
	 */
	async register(user) {
		try {
			const { username, password } = user
			const _user = await UserModel.findOne({username})

			if (_user) {
				throw new AuthorizeError('用户已存在')
			} else {
				const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
				const hash = await bcrypt.hash(password, salt)
				user.password = hash
				user.createdTime = Date.now()
				await new UserModel(user).save()
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
	async login(user) {
		try {
			const { username, password } = user
			const _user = await UserModel.findOne({username})

			if (_user) {
				if (!await bcrypt.compare(password, _user.password)) {
					throw new AuthorizeError(`密码错误`)
				}
			} else {
				throw new AuthorizeError(`用户不存在`)
			}
		} catch (e) {
			e.message = `login fail - ${e.message}`
			throw e
		}
	}
}

module.exports = userDriver
