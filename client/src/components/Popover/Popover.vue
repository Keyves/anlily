<template>
	<div class="c-popover">
		<slot></slot>
    </div>
</template>

<script>
import Drop from 'tether-drop'
export default {
	name: 'c-popover',
	props: {
		trigger: {
			type: String,
			default: 'hover'
		},
		position: {
			type: String,
			default: 'bottom left'
		}
	},
	mounted() {
		if (this.$refs.target) {
			this.init()
		}
	},
	beforeDestroy() {
		if (this.drop) {
			this.drop.remove()
			this.drop.destroy()
		}
	},
	data() {
		return {
			drop: null,
			shouldOpen: true
		}
	},
	methods: {
		init() {
			const { $refs: { target }, $el, position, trigger, onOpen, onClose } = this
			const drop = new Drop({
				target: target,
				content: $el,
				position: position,
				openOn: trigger
			})

			drop.remove()

			target.addEventListener('mouseover', onOpen, false)
			target.addEventListener('mouseout', onClose, false)
			$el.addEventListener('mouseover', onOpen, false)
			$el.addEventListener('mouseout', onClose, false)

			this.drop = drop
		},
		onOpen(e) {
			this.shouldOpen = true
			setTimeout(() => {
				if (this.shouldOpen) {
					this.drop.open()
					this.$emit('open', e)
				}
			}, 100)
		},
		onClose(e) {
			this.shouldOpen = false
			setTimeout(() => {
				if (!this.shouldOpen) {
					this.drop.remove()
					this.$emit('close', e)
				}
			}, 100)
		}
	}
}
</script>

<style lang="scss">
@import "../variables";

.c-popover {
	padding: 10px 20px;
	background: white;
	box-shadow: $shadow-incline;
}
</style>
