<template>
	<div class="c-menu">
		<div class="c-menu-title" @click="changeExpandStatus">
			<span class="c-menu-title-text">{{text}}</span>
			<c-icon icon="expand_more" :style="{transform: this.expandStatus ? 'rotate(180deg)' : ''}"></c-icon>
		</div>
		<div class="c-menu-content" :class="this.expandStatus ? 'expand' : ''">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import MenuItem from './MenuItem'

export default {
	name: 'c-menu',
	props: {
		text: String,
		expand: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			expandStatus: this.expand
		}
	},
	methods: {
		changeExpandStatus() {
			this.expandStatus = !this.expandStatus
		}
	}
}
</script>

<style lang="scss">


.c-menu {
	width: 200px;
	overflow: hidden;

	&-item {
		padding: 10px;
		cursor: pointer;

		&:hover {
			background: #f5f5f5;
		}
	}


	&-title {
		display: flex;
		@extend .c-menu-item;

		& > .c-icon {
			line-height: inherit;
			font-size: inherit;
			transition: transform linear .2s;
		}

		& > &-text {
			flex: 1;
		}
	}

	&-content {
		padding-left: 10px;
		max-height: 0;
		transition: max-height ease .5s;
		background: white;

		&.expand {
			max-height: 1000px;
		}

		& > *:not(.c-menu) {
			@extend .c-menu-item;
		}

		& > .c-menu {
			width: 100%;
		}
	}
}
</style>
