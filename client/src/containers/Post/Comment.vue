<template>
	<div class="comment">
		<div class="header">
			<span class="index secondary">{{'#' + index}}</span>
			<span class="username">{{username}}</span>
			<span class="created-time secondary">{{distanceNow}}</span>
			<span class="reply secondary" v-if="reply">
				<c-icon type="keyboard_arrow_right"></c-icon>
				<span>{{reply}}</span>
			</span>
		</div>
		<div class="section">
			<div class="text">{{text}}</div>
		</div>
	</div>
</template>

<script>
import DateLib from 'src/lib/DateLib'

export default {
	name: 'a-comment',
	props: {
		index: Number,
		reply: Number,
		username: String,
		createdTime: String,
		text: String
	},
	computed: {
		distanceNow() {
			return DateLib.getDistanceNow(new Date(this.createdTime))
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~src/variables";

$small-spacing: 5px;

.comment {
	padding: $small-spacing $spacing;
	border: 1px dashed #f5f5f5;//#eaeaea;
	box-sizing: border-box;

	&:hover {
		background: #ddd;
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
		}

		& > .created-time {
			flex: 1;
			text-align: right;
		}

		& > .reply {
			display: flex;
			align-items: center;
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
