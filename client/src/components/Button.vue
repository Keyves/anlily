<template>
	<button class="c-button" :class="oClass" :type="type" :style="oStyle">
		<c-icon :type="icon" v-if="icon"></c-icon>
		<slot></slot>
	</button>
</template>

<script>
import Icon from './Icon'

export default {
	name: 'c-button',
	props: {
		color: {
			type: String,
			default: 'default'
		},
		type: String,
		icon: String,
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
			const color = this.color
			let className = this.class
			if (!(color.indexOf('#') > -1)) {
				className += ' c-button-' + color
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
	},
	components: {
		Icon
	}
}
</script>

<style lang="scss">
@import "./variables";


.c-button {
	-webkit-mask-image: -webkit-radial-gradient(circle, white, black);
	outline: none;
    display: flex;
    justify-content: center;
	align-items: center;
    padding: .1rem .2rem;
    text-decoration: none;
    color: #666;
    touch-action: manipulation;
	cursor: pointer;

	&:hover {
		opacity: .6;
	}

	&-default {
		background-color: $color-default;
		color: $color-normal-font;
		border: 1px solid #ccc;
	}

	&-ghost {
		background-color: transparent;
		color: white;
		border: none;
	}

	&-primary {
		background-color: $color-primary;
		color: white;
		border: none;
	}

	&-success {
		background-color: $color-success;
		color: white;
		border: none;
	}

	&-info {
		background-color: $color-info;
		color: white;
		border: none;
	}

	&-warning {
		background-color: $color-warning;
		color: white;
		border: none;
	}

	&-error {
		background-color: $color-error;
		color: white;
		border: none;
	}
}
</style>
