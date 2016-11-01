<template>
	<div class="comment">
		<div class="header">
			<span class="nickname">{{nickname}}</span>
			<span class="agent secondary">{{agent}}</span>
			<span class="time secondary">{{time}}</span>
		</div>
		<div class="section">
			<div class="text">{{text}}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'a-comment',
	props: {
		nickname: String,
		agent: String,
		time: String,
		text: String
	}
}
</script>

<style lang="scss" scoped>
@import "~src/variables";

.comment {
	&:hover {
		background: #ddd;
	}

	& > .header {
		display: flex;
		padding: $spacing;
		align-items: center;
		justify-content: space-between;
		white-space: nowrap;

		& > .nickname {
			font-size: 16px;
			padding: 0 $spacing;
		}

		& > .agent {
			flex: 1;
		}
	}

	& > .section {
		& > .text {
			padding: $spacing;
		}
	}
}
.secondary {
	color: #999;
	font-size: 12px;
}
</style>
