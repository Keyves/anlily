<template>
<div class="sidebar">
	<c-menu v-for="item in forums" :text="item.name" :expand="item.expand">
		<c-menu-item
			v-for="category in item.categorys"
			:style="category === currentCategory ? {background: '#ddd'} : undefined"
			@click="changeCategoryAndGetPosts(category)"
			>
			{{category}}
		</c-menu-item>
	</c-menu>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'a-sidebar',
	computed: {
		...mapState({
			currentCategory: state => state.status.category,
			forums: state => {
				const forums = state.forums
				const currentCategory = state.status.category

				let i, len, categorys
				for (i = 0, len = forums.length; i < len; i++) {
					categorys = forums[i].categorys
					if (categorys.indexOf(currentCategory) > -1) {
						forums[i].expand = true
					}
				}
				return forums
			}
		})
	},
	methods: {
		...mapActions(['changeCategoryAndGetPosts'])
	}
}
</script>

<style lang="scss">
@import "~src/variables";

.sidebar {
	background: white;
	box-shadow: 0 0 5px $shadow-color;
}
</style>
