const api = require('./api')

module.exports = async (request, userinfo) => {
	await request.post(api.register).send(userinfo)
	const res = await request.post(api.login).send(userinfo)
	return res.headers['set-cookie']
}
