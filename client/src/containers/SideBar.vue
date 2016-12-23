<template>
<div class="a-sidebar">
	<c-menu v-for="item in forums" :text="item.name" :expand="item.expand">
		<c-menu-item
			v-for="category in item.categorys"
			:style="category === currentCategory ? {background: '#ddd'} : undefined"
			@click="changeCategoryAndGetPosts(category)"
			>
			{{category}}
		</c-menu-item>
	</c-menu>
	<c-button class="a-sidebar-item" @click="changeCategoryAndGetReportsFetch('值班室')">值班室</c-button>
	<c-button class="a-sidebar-item">布告栏</c-button>
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

				let i, len
				for (i = 0, len = forums.length; i < len; i++) {
					if (forums[i].categorys.indexOf(currentCategory) > -1) {
						forums[i].expand = true
					}
				}
				return forums
			}
		})
	},
	methods: {
		...mapActions(['changeCategoryAndGetPosts', 'changeCategoryAndGetReportsFetch'])
	}
}
</script>

<style lang="scss">
@import "~src/variables";

.a-sidebar {
	background: white;
	box-shadow: 0 0 5px $shadow-color;

	& > &-item {
	    display: block;
	    font-size: 13px;
		padding: 10px;
	    width: 100%;
	    text-align: left;
	}
}
</style>
