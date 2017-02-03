<template>
    <div>
		<pre class="c-at-pre" :class="className" :style="style">{{text}}</pre>
		<span ref="atEl">{{at}}</span>
    </div>
</template>

<script>
export default {
	name: 'c-caret',
	props: {
		el: {
			type: [HTMLTextAreaElement, HTMLInputElement]
		},
		at: {

		}
	},
	data() {
		console.log(this.el)
		return {
			style: undefined,
			className: undefined,
			text: undefined,
			hasAddEvent: false
		}
	},
	beforeUpdate() {
		const { el } = this
		const { atEl } = this.$refs
		console.log(this.el)
		if (!this.hasAddEvent && el && el.value) {
			console.log(this.trigger)
			el.addEventListener('keyup', () => {
				this.text = el.value
				this.trigger({
					top: atEl.offsetTop,
					left: atEl.offsetLeft
				})
			}, false)
			this.style = el.style
			this.className = el.className
			this.text = el.value
			this.hasAddEvent = true
		}
	},
	methods: {
		trigger(position) {
			this.$emit(position)
		}
	}
}
</script>

<style lang="scss">
.c-at-pre {
	position: fixed;
	right: 0;
	bottom: 0;
}
</style>
