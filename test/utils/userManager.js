const api = require('./api')

module.exports =  {
	// request, userinfo UserModel, primaryKey
	init(opts) {
		Object.assign(this, opts)
	},

	async registerAndLogin(role) {
		const { request, userinfo, primaryKey, UserModel } = this
		let res

		try {
			res = await request.post(api.register).send(userinfo)
			if (role === 'admin') {
				await UserModel.findOneAndUpdate({[primaryKey]: userinfo[primaryKey]}, {role: 1123})
				// 更新session缓存的user
				res = await request.post(api.login).send(userinfo)
			}
			return res.headers['set-cookie']
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
