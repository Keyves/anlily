<template>
	<i class="c-icon material-icons" :class="oClass" :style="oStyle">{{icon}}</i>
</template>

<script>
export default {
	name: 'c-icon',
	props: {
		icon: {
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
	data() {
		const color = this.color
		const oStyle = this.style
		let oClass = this.class

		if (color.indexOf('#') > -1) {
			oStyle.color = color
		} else {
			oClass = [oClass, 'c-icon-' + color].join(' ')
		}
		return {
			oStyle,
			oClass
		}
	}
}

</script>
<style lang="scss">
@import url(~src/components/fonts/material-icons.css);
@import "./variables";

.c-icon {
	font-size: initial;

	&-default {
		color: inherit;
		background: transparent;
		border: none;
	}

	&-ghost {
		color: transparent;
		background: transparent;
		border: none;
	}

	&-primary {
		color: $color-primary;
		background: transparent;
		border: 1px solid #3079ed;
		color: white;
	}

	&-success {
		color: $color-success;
		background: transparent;
		border: none;
	}

	&-info {
		color: $color-info;
		background: transparent;
		border: none;
	}

	&-warning {
		color: $color-warning;
		background: transparent;
		border: none;
	}

	&-error {
		color: $color-error;
		background: transparent;
		border: none;
	}
}
/*url('https://fonts.gstatic.com/s/materialicons/v16/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2') format('woff2');*/
</style>
