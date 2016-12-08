const api = require('./api')
const roles = require('./roles')

module.exports =  {
	// request, userinfo UserModel, primaryKey
	init(opts) {
		Object.assign(this, opts)
	},

	async registerAndLogin(role) {
		const { request, userinfo, primaryKey, UserModel } = this
		let res, cookies

		try {
			switch(role) {
				case roles.SUPER_ADMIN:
					res = await request.post(api.register).send(userinfo)
					await UserModel.findOneAndUpdate({[primaryKey]: userinfo[primaryKey]}, {role: 1123})
					// 更新session缓存的user
					res = await request.post(api.login).send(userinfo)
					break
				case roles.REGISTER:
					res = await request.post(api.register).send(userinfo)
					break
				case roles.ANONYMOUS:
				default:
					res = await request.post(api.anonymous).send(userinfo)
			}
			cookies = res.headers['set-cookie']
			return cookies ? cookies.join(';') : undefined
		} catch(e) {
			console.log('userManager: 用户创建失败', primaryKey, userinfo[primaryKey])
		}
	},

	async removeAndLogout() {
		const { request, userinfo, primaryKey, UserModel } = this
		await UserModel.remove({[primaryKey]: userinfo[primaryKey]})
		await request.get(api.logout)
	}
}
