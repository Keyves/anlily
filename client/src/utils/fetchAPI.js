import fetch from 'isomorphic-fetch'
import serialize from './serialize'

export default async function fetchApi(url, method, data) {
	let res, json
	switch(method.toUpperCase()) {
		case 'GET':
		case 'DELETE':
			url = Object.prototype.toString.call(data) === '[object Object]' ? [url, serialize(data)].join('?') : url
			res = await fetch(url, {
				method: method,
				credentials: 'include'
			})
			break
		case 'POST':
		case 'PUT':
		case 'PATCH':
			data = JSON.stringify(data)
			res = await fetch(url, {
				method: method,
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: data
			})
			break
		default:
			throw new Error('method[second param] should be the one of [get, post, put, patch, delete]')
	}
	if (res && res.status === 200) {
		json = await res.json()
		if (json.code) {
			throw new Error(`${json.code} ${json.message}`)
		}
		return json.data
	} else if (res && res.status < 400 && res.status > 200) {
		return await res.text()
	} else {
		throw new Error(`${url} ${res.status}`)
	}
}
