import Vue from 'vue'

export default Vue.component('my-component', {
	// Props 可选
	props: {
		type: String,
		value: [String, Object],
		comments: Array,
	},
    // 为了弥补缺少的实例
    // 提供第二个参数作为上下文
    render: function(h) {
		const { type, value, comments } = this

		switch(type) {
			case 'at':
				return h('span', {
					domProps: {
						textContent: '@' + value.username
					},
					style: {
						cursor: 'pointer',
						color: '#2196f3'
					},
					on: {
						click: function(e) {
							console.log(e)
						}
					}
				})
			case 'anchor':
				const comment = comments && comments.find(v => v._id === Number(value.commentid))
				return h('span', {}, [
					h('c-popover', {
						ref: 'anchor'
					}, comment && [comment.username, ': ', comment.text].join('')),
					h('span', {
						domProps: {
							textContent: '#' + value.commentid
						},
						style: {
							cursor: 'pointer',
							color: 'orange'
						},
						directives: [{
							name: 'popover',
							arg: 'anchor'
						}]
					})
				])
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
    }
})
