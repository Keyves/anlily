const api = require('./api')

module.exports =  {
	// request, userinfo UserModel, primaryKey
	init(opts) {
		Object.assign(this, opts)
	},

	async registerAndLogin(role) {
		const { request, userinfo, primaryKey } = this
		const res = await request.post(api.register).send(userinfo)
		if (role === 'admin') {
			const user = this.UserModel.findOne({primaryKey})
			user.role = 1123
			await user.save()
		}
		return res.headers['set-cookie']
	},

	async removeAndLogout() {
		const { request, userinfo, primaryKey, UserModel } = this
		await UserModel.remove({[primaryKey]: userinfo[primaryKey]})
		await request.get(api.logout)
	}
}
