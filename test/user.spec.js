const supertest = require('supertest')
const api = require('./utils/api')
const clone = require('./utils/clone')
const userManager = require('./utils/userManager')
const app = require('../server/app')
const UserModel = require('../server/src/models/user')
const roles = require('./utils/roles')

process.env.NODE_ENV = 'test'

describe('user', () => {
	async function removeUser() {
		for (let user of arguments) {
			await UserModel.remove({_id: user._id})
		}
	}
	const request = supertest.agent(app.listen())
	const userinfo = {
		email: 'username@gmail.com',
		password: 'password123456'
	}
	const returnKeys = ['username', 'comments', 'createdTime', 'email', 'role']
	userManager.init({request, userinfo, primaryKey: 'email', UserModel})

	describe('anonymous', async () => {
		it('success', async () => {
			const res = await request.post(api.anonymous).send().expect(200)
			const user = res.body.data
			expect(user).to.contain.any.keys(returnKeys)

			await removeUser(user)
		})
	})

	describe('register', async () => {
		it('success', async () => {
			const res = await request.post(api.register).send(userinfo).expect(200)
			const user = res.body.data
			expect(user).to.contain.any.keys(returnKeys)
			expect(user.email).to.equal(userinfo.email)

			await removeUser(user)
		})

		it('fail, account has existed', async () => {
			await request.post(api.register).send(userinfo).expect(401)
		})

		it('fail, email is invaild', async () => {
			let handleData, email, errorSamples = ['what', 'csahvnlii.com', '123123/@a.com']

			for (email of errorSamples) {
				handleData = clone(userinfo, {email})
				await request.post(api.register).send(handleData).expect(401)
			}
		})

		it('fail, password is invalid', async () => {
			let handleData, password, errorSamples = ['1231', 'snvdio', '.dvsa', '123.']

			for (password of errorSamples) {
				handleData = clone(userinfo, {password})
				await request.post(api.register).send(handleData).expect(401)
			}
		})
	})

	describe('login post', async () => {
		before(async () => {
			await request.post(api.register).send(userinfo)
		})

		it('success', async () => {
			const res = await request.post(api.login).send(userinfo).expect(200)
			const user = res.body.data
			expect(user).to.contain.any.keys(returnKeys)

			await removeUser(user)
		})

		it('fail, email is invaild', async () => {
			let handleData, email, errorSamples = ['what', 'csahvnlii.com', '123123/@a.com']

			for (email of errorSamples) {
				handleData = clone(userinfo, {email})
				await request.post(api.login).send(handleData).expect(401)
			}
		})

		it('fail, password is invalid', async () => {
			let handleData, password, errorSamples = ['1231', 'snvdio', '.dvsa', '123.']

			for (password of errorSamples) {
				handleData = clone(userinfo, {password})
				await request.post(api.login).send(handleData).expect(401)
			}
		})
	})

	describe('register, login get', async () => {
		before(async () => {
			await userManager.registerAndLogin(roles.REGISTER)
		})

		after(async () => {
			await userManager.removeAndLogout()
		})

		it('success, with cookie', async () => {
			await request.get(api.login).expect(200)
		})

		it('fail, without cookie', async () => {
			// 清除request自带的cookie
			await request.get(api.login).set('cookie', '').expect(404)
		})
	})


	describe('register, logout get', async () => {
		before(async () => {
			await userManager.registerAndLogin(roles.REGISTER)
		})

		after(async () => {
			await userManager.removeAndLogout()
		})

		it('success, with cookie', async () => {
			await request.get(api.logout).expect(200)
		})

		it('fail, without cookie', async () => {
			await request.get(api.logout)
			// 等过检验是否存在登录中的用户来判断是否登出
			await request.get(api.login).expect(404)
		})
	})
})
