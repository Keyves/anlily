import Vue from 'vue'
import Popover from './Popover'

Vue.directive('popover', {
	bind(el, binding, vnode) {
		vnode.context.$refs[binding.arg].$refs.target = el
	}
})

export default Popover
