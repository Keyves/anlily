<template>
	<div>
		<ul class="c-at-menu" :style="menuStyle">
			<li></li>
		</ul>
		<c-caret :el="el" @triggle="triggle"></c-caret>
	</div>
</template>

<script>
export default {
	name: 'c-at',
	props: {
		el: {
			type: [HTMLTextAreaElement, HTMLInputElement]
		},
		menu: {
			type: Array,
			default: []
		},
		at: {
			type: String,
			default: '@'
		}
	},
	data() {
		return {
			menuStyle: {
				position: 'absolute'
			}
		}
	},
	methods: {
		triggle(position) {
			const { el, at } = this
			if(el.value.charAt(cursor - 1) === at){  //判断光标前的字符是不是'@'
				this.menuStyle.left = position.left
				this.menuStyle.top = position.top

				// doShowAtList(function(name){  //打开用户列表
				// 	var end = cursor + name.length;  //原光标所在位置加用户名长度为end所在位置
				// 	target.setRangeText(  //通过 setRangeText 接口将需要的值设置到输入框里
				// 		name,cursor,end,'end'  //将光标定位在文本最后
				// 	);
				// })
			}
		}
	}
}
</script>

<style lang="scss">
</style>
