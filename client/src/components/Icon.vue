<template>
	<i class="c-icon material-icons" :class="oClass" :style="oStyle">{{type}}</i>
</template>

<script>
export default {
	name: 'c-icon',
	props: {
		type: {
			type: String,
			required: true
		},
		color: {
			type: String,
			default: 'default'
		},
		style: {
			type: Object,
			default: () => ({})
		},
		class: {
			type: String,
			default: ''
		}
	},
	computed: {
		oClass() {
			const type = this.type
			const color = this.color
			let className = this.class
			if (!(color.indexOf('#') > -1)) {
				className = [className, 'c-icon-' + color].join(' ')
			}
			return className
		},
		oStyle() {
			const color = this.color
			const style = this.style
			if (color.indexOf('#') > -1) {
				style.color = color
			}
			return style
		}
	}
}

</script>
<style lang="scss">
@import url(~src/components/fonts/material-icons.css);

//url('https://fonts.gstatic.com/s/materialicons/v16/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2') format('woff2');
</style>
