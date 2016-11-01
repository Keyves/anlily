import Vue from 'vue'
import App from 'src/containers/Home'
import 'material-design-icons'
import ColorfulUI from 'src/components'
import store from './vuex'
import 'material-design-icons'
import './common.scss'
import './filter'

Vue.config.debug = true

Vue.use(ColorfulUI)

const div = document.createElement('div')
div.id = 'root'
document.body.appendChild(div)

new Vue({
	store,
	el: '#root',
	render: h => h(App)
})
