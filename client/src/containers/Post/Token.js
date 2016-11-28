import Vue from 'vue'

export default Vue.component('my-component', {
    // 为了弥补缺少的实例
    // 提供第二个参数作为上下文
    render: function(h) {
		const { type, value } = this

		switch(type) {
			case 'at':
				return h('span', {
					domProps: {
						textContent: '@' + value.username
					},
					style: {
						color: 'blue'
					},
					on: {
						click: function(value) {
							console.log(value)
						}
					}
				})
			case 'image':
				return h('img', {
					attrs: {
						src: value
					}
				})
			case 'text':
			default:
				return h('span', value)
		}
    },
    // Props 可选
    props: {
        type: String,
        value: [String, Object]
    }
})
