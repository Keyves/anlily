import { throttle } from 'src/utils'

export default {
	props: {
		columnWidth: {
			type: Number,
			default: 500
		}
	},
	data() {
		return {
			column: 1,
			handler: null,
			restCommentVisible: false
		}
	},
	computed: {
		cols() {
			// TODO 需被组件提供items属性 important!!!
			let items, cols = [], columnNumber, i
			items = this.items
			columnNumber = this.column

			// 初始化文章列
			for (i = 0; i < columnNumber; i++)
				cols[i] = []

			// 分发文章到各个列中, 并给文章和评论设置索引index
			for (i = 0; i < items.length; i++) {
				cols[i % columnNumber].push(items[i])
			}

			return cols
		}
	},
	mounted() {
		const waterfall = this.$refs.waterfall
		const columnWidth = this.columnWidth
		let column

		// 节流，触发间隔至少为100ms
		const handler = throttle(() => {
			// 在当前瀑布流的宽度下容纳最大整数列数
			column = Math.floor(waterfall.offsetWidth / columnWidth)
			if (column !== this.column && column > 0) {
				this.column = column
			}
		}, 100)

		window.addEventListener('resize', handler, false)
		this.handler = handler
	},
	destroyed() {
		window.removeEventListener('resize', this.handler, false)
	}
}
