const supertest = require('supertest')
const api = require('./utils/api')
const clone = require('./utils/clone')
const userManager = require('./utils/userManager')
const app = require('../server/app')
const PostModel = require('../server/src/models/post')
const UserModel = require('../server/src/models/user')
const { expect } = require('chai')
const roles = require('./utils/roles')

process.env.NODE_ENV = 'test'

describe('post', function() {
	async function removePost() {
		for (let post of arguments) {
			await PostModel.remove({_id: post._id})
		}
	}
	const request = supertest.agent(app.listen())
	const userinfo = {
		email: 'username@gmail.com',
		password: 'password123456'
	}
	userManager.init({request, userinfo, primaryKey: 'email', UserModel})

	const invalidCategory = '不合法类别'
	const validCategory = '综合版1'
	const post = {
		text: 'too young too simple, sometimes naive',
		category: validCategory,
		images: [],
		tags: []
	}
	const validatePosts = [{text: '大新闻', category: validCategory}, {text: 'Countries even, regardless of fortune or misfortune', category: validCategory}]


	describe('get', function() {
		let responses = []
		before(async () => {
			for (let temp of validatePosts) {
				temp = clone(post, temp)
				responses.push(await request.post(api.post).send(temp))
			}
		})

		after(async () => {
			await removePost.apply(null, responses.map(v => v.body.data))
		})

		it('get, by a existing category', async () => {
			const res = await request.get(api.post).query({category: validCategory})
			expect(res.status).to.equal(200)
			const posts = res.body.data
			for (const temp of posts) {
				expect(temp).to.contain.all.keys(post)
			}
		})

		it('get fail, by a invalid category', async () => {
			const res = await request.get(api.post).query({category: invalidCategory})
			expect(res.status).to.equal(404)
		})
	})


	describe('post, not login', async () => {
		it('success, have _id auto increment and generate timestamp, username, userid', async () => {
			let res

			res = await request.post(api.post).send(post)
			expect(res.status).to.equal(200)
			const _post = res.body.data
			expect(_post).to.contain.all.keys(['_id', 'createdTime', 'username'])

			res = await request.post(api.post).send(post)
			expect(res.status).to.equal(200)
			const increPost = res.body.data
			expect(increPost._id).to.equal(_post._id + 1)

			await removePost(_post, increPost)
		})

		it('success, ignore redundant props', async () => {
			const redundantProp = 'redundantProp'
			const data = clone(post, {redundantProp})
			const res = await request.post(api.post).send(data)
			expect(res.status).to.equal(200)
			const _post = res.body.data
			expect(_post).to.not.contain.keys(redundantProp)

			await removePost(_post)
		})

		it('fail, lack of text', async () => {
			const data = clone(post, {text: ''})
			const res = await request.post(api.post).send(data)
			expect(res.status).to.equal(400)
		})

		it('fail, lack of category', async () => {
			const data = clone(post, {category: ''})
			const res = await request.post(api.post).send(data)
			expect(res.status).to.equal(400)
		})
	})

	describe('post, login', async () => {
		let cookies
		before(async () => {
			cookies = await userManager.registerAndLogin(roles.REGISTER)
		})

		after(async () => {
			await userManager.removeAndLogout()
		})

		it('success, have username, userid', async () => {
			const res = await request.post(api.post).set('cookie', cookies.join(';')).withCredentials().send(post)
			expect(res.status).to.equal(200)
			const _post = res.body.data
			expect(_post).to.contain.all.keys(['_id', 'createdTime', 'username', 'userid'])

			await removePost(_post)
		})
	})

	describe.only('delete', async () => {
		afterEach(async () => {
			await userManager.removeAndLogout()
		})

		it('success', async () => {
			const cookies = await userManager.registerAndLogin(roles.SUPER_ADMIN)

			let res
			res = await request.post(api.post).set('cookie', cookies.join(';')).send(post)
			const postid = res.body.data._id
			res = await request.del(api.post).query({postid}).set('cookie', cookies.join(';'))
			expect(res.status).to.equal(200)
			res = await request.get(api.post).query({category: post.category})
			expect(res.status).to.equal(404)
		})

		it('fail, no permission', async () => {
			const cookies = await userManager.registerAndLogin(roles.REGISTER)

			let res
			res = await request.post(api.post).set('cookie', cookies.join(';')).send(post)
			const postid = res.body.data._id
			res = await request.del(api.post).query({postid}).set('cookie', cookies.join(';'))
			expect(res.status).to.equal(403)
			res = await request.get(api.post).query({category: post.category})
			const _post = res.body.data[0]
			expect(res.status).to.equal(200)
			expect(_post).to.contain.all.keys(post)

			await removePost(_post)
		})
	})
})

describe('comment', async () => {
	describe('post, not login', async () => {
		it('success, have _id auto increment and generate timestamp, username', async () => {

		})

		it('fail, lack of text', async () => {

		})
	})

	describe('post, login', async () => {
		it('success, have _id auto increment and generate timestamp, username, userid', async () => {

		})
	})

	describe('delete, not login', async () => {

	})
})
