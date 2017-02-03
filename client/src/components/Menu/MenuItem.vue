<template>
	<div @click="handleClick">		
		<slot></slot>
	</div>
</template>

<script>

export default {
	name: 'c-menu-item',
	methods: {
		handleClick(e) {
			this.$emit('click', e)
		}
	}
}
</script>
