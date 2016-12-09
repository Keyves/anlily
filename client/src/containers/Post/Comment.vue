<template>
	<div class="comment">
		<div class="header">
			<span class="id secondary">{{'#' + id}}</span>
			<span class="username">{{username}}</span>
			<span class="created-time secondary">{{distanceNow}}</span>
			<c-button color="default" icon="error_outline" @click.stop="onReport"></c-button>
			<c-button class="btn delete" icon-color="error" icon="delete" @click="onRemove"></c-button>
		</div>
		<div class="section">
			<div class="text">{{text}}</div>
		</div>
	</div>
</template>

<script>
import DateLib from 'src/lib/DateLib'

export default {
	name: 'a-post-comment',
	props: {
		id: Number,
		username: String,
		createdTime: String,
		text: String
	},
	computed: {
		distanceNow() {
			return DateLib.getDistanceNow(new Date(this.createdTime))
		}
	},
	methods: {
		onRemove(e) {
			this.$emit('remove', e)
		},
		onReport(e) {
			this.$emit('report', e)
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~src/variables";

$small-spacing: 5px;

.comment {
	padding: $small-spacing $spacing;
	border: 1px dashed #f5f5f5;
	box-sizing: border-box;

	&:hover {
		background: #ddd;

		& .created-time {
			display: none;
		}

		& .btn.delete {
			display: block;
			padding: 0;
		}
	}

	& .btn.delete {
		display: none;
	}

	& > .header {
		display: flex;
		padding: $small-spacing 0;
		align-items: center;
		justify-content: space-between;
		white-space: nowrap;
		font-size: 12px;

		& > .username {
			padding: 0 $spacing;
			flex: 1;
		}
	}

	& > .section {
		& > .text {
			padding: $small-spacing 0;
		}
	}
}
.secondary {
	color: #999;
	font-size: 12px;
}
</style>
