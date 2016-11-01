import Vue from 'vue'
import DateUtil from 'src/utils/DateUtil'

Vue.filter('dist-now', (value) => {
	if (typeof value !== 'string')
		throw new Error('you should through a string of Date')
	return DateUtil.getDistanceNow(new Date(value))
})

Vue.filter('dom-string', (value) => {
	if (typeof value !== 'string')
		throw new Error('you should through a string of DOM')
	const result = value.match(/\>(.*)\</)
	return result ? result[1] : ''
})

Vue.filter('judge-empty', (value) => {
	return value === '0' || !value ? '' : value
})


Vue.filter('thumb180', (arr) => {
	return arr.map(v => {
		v.thumbnail_pic = v.thumbnail_pic.replace(/\/thumbnail\//, '/thumb180/')
		return v
	})
})
