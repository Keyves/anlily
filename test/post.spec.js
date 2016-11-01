const supertest = require('supertest')
const mockgoose = require('mockgoose')
const mongoose = require('mongoose')
const app = require('../server/app')
const chai = require('chai')
const expect = chai.expect

process.env.NODE_ENV = 'test'

const request = supertest.agent(app.listen())

const login = (() => {
	const userinfo = {
		username: 'mock@gmail.com',
		password: 'password'
	}
	let cookies = null

	return async () => {
		if (!cookies) {
			await request.post('/u/register').send(userinfo).expect(201)
			const res = await request.post('/u/login').send(userinfo).expect(204)
			cookies = res.headers['set-cookie']
		}
		return cookies
	}
})()


async function getData(path, cookies) {
	const res = await request.get('/u/posts').set('cookie', cookies)
	return res.body.data
}


describe('get & insert & delete', function() {
	this.timeout(5000)

	const post = {
		title: '膜法师语录',
		inAWord: 'too young too simple, sometimes naive',
		content: '你们啊，还是要多学习一个',
		tags: ['+1s']
	}

	let cookies = null

	before(async () => {
		await mockgoose(mongoose)
		mongoose.connect('localhost', 'anonymous')
		cookies = await login()
	})

	after(async (done) => {
		//await logout()
		// mongoose.unmock(() => done())
		mongoose.unmock(done)
		// # backup
		// mongodump -h localhost -d anonymous -o server/.db
		// # restore
		// mongorestore -h localhost -d anonymous --drop server/.db/anonymous
	})

	it('insert success', async () => {
		await request.post('/post').send(post).set('cookie', cookies).expect(201)
	})

	it('get & delete success', async () => {
		const posts = await getData('/u/posts', cookies)
		const postId = posts[0]._id
		const recievedData = await getData(`/post/${postId}`, cookies)
		expect(recievedData).to.be.deep.equal(post)
		await request.del(`/post/${postId}`).set('cookie', cookies).expect(204)
	})

	it('get fail, postId is not exists', async () => {
		await request.get(`/post/${123456}`).set('cookie', cookies).expect(500)
	})

	it('delete fail, postId is not exists', async () => {
		await request.del(`/post/${123456}`).set('cookie', cookies).expect(500)
	})
})

/*
describe('update', async () => {
	before(async () => {
		await login()
	})

	it('success', async () => {

	})

	it('fail, invalid password', async () => {

	})
})


describe('patch', async () => {
	before(async () => {
		await login()
	})

	it('success', async () => {

	})

	it('fail, invalid password', async () => {

	})
})
*/
