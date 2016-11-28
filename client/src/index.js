import Vue from 'vue'
import App from 'src/containers/App'
import 'material-design-icons'
import ColorfulUI from 'src/components'
import store from './vuex'
import 'material-design-icons'
import './common.scss'
import './filter'

Vue.config.debug = true

Vue.use(ColorfulUI)

console.debug = function() {
	var args = Array.prototype.slice.apply(arguments)
	console.log.apply(console, args.map(v => typeof v === 'object' ? JSON.parse(JSON.stringify(v)) : v))
}

const div = document.createElement('div')
div.id = 'root'
document.body.appendChild(div)

new Vue({
	store,
	el: '#root',
	render: h => h(App)
})
