const supertest = require('supertest')
const app = require('../server/app')
const UserModel = require('../server/app/models/user')
const chai = require('chai')
const expect = chai.expect

process.env.NODE_ENV = 'test'

const request = supertest.agent(app.listen())

//
// describe('find', async () => {
//
// })


describe('register', async () => {
	const data = {
		username: 'username@gmail.com',
		password: 'password'
	}

	after(async () => {
		await UserModel.remove({username: data.username})
	})

	it('success', async () => {
		await request.post('/u/register').send(data).expect(204)
	})

	it('fail, account has existed', async () => {
		await request.post('/u/register').send(data).expect(401)
	})
})

describe('login', async () => {
	const data = {
		username: 'username@gmail.com',
		password: 'password'
	}

	before(async () => {
		await request.post('/u/register').send(data).expect(204)
	})

	after(async () => {
		await UserModel.remove({username: data.username})
	})

	it('success', async () => {
		await request.post('/u/login').send(data).expect(204)
	})

	it('fail, invalid password', async () => {
		data.password = 'other'
		await request.post('/u/login').send(data).expect(401)
	})
})
