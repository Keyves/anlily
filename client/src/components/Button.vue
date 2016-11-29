<template>
	<button class="c-button" :class="oClass" :type="type" :style="oStyle" @click="handleClick">
		<c-icon :icon="icon" :color="iconColor" v-if="icon"></c-icon>
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
		iconColor: String,
		style: {
			type: Object,
			default: () => ({})
		},
		class: {
			type: String,
			default: ''
		}
	},
	methods: {
		handleClick(e) {
			this.$emit('click', e)
		}
	},
	data() {
		const color = this.color
		const oStyle = this.style
		let oClass = this.class

		if (color.indexOf('#') > -1) {
			oStyle.color = color
		} else {
			oClass = [oClass, 'c-button-' + color].join(' ')
		}
		return {
			oStyle,
			oClass
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
	border: none;
    display: flex;
    justify-content: center;
	align-items: center;
    padding: 5px 15px;
	border-radius: 3px;
    text-decoration: none;
    color: #666;
    touch-action: manipulation;
	cursor: pointer;

	&[disabled] {
		border: 1px solid gray;
		color: white;
		background: #999;
	}

	&:hover {
		opacity: .6;
	}

	&:focus {
		outline: none;
	}

	&-default {
		background-color: $color-default;
		color: $color-normal-font;
		border: none;
	}

	&-ghost {
		background-color: transparent;
		color: white;
		border: none;
	}

	&-primary {
		background-color: $color-primary;
		background-image: -webkit-linear-gradient(top,#4d90fe,#4787ed);
		border: 1px solid #3079ed;
		color: white;
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
