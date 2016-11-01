<template>
	<div class="article">
		<div class="header" @click="changeExpandStatus">
			<span>{{index}}</span>
			<span class="nickname">{{nickname}}</span>
			<span class="agent secondary">{{agent}}</span>
			<span class="time secondary">{{time}}</span>
		</div>
		<div class="section" @click="changeExpandStatus">
			<div class="text">{{text}}</div>
		</div>
		<div class="footer" :class="expandStatus ? '' : 'expand'">
			<div class="comments">
				<slot></slot>
			</div>
			<div class="inputbox">
				<textarea class="section" type="text" :value="value" @input="inputComment" placeholder="输入内容限100字"></textarea>
				<div class="btn-group">
					<c-button icon="photo"></c-button>
					<c-button color="info">发送</c-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'a-post',
	props: {
		index: Number,
		nickname: String,
		agent: String,
		time: String,
		text: String
	},
	data() {
		return {
			value: '',
			expandStatus: true
		}
	},
	methods: {
		inputComment(e) {
			this.value = e.target.value
		},
		changeExpandStatus() {
			this.expandStatus = !this.expandStatus
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~src/variables";

.article {
	background-color: #fff;
	margin: $spacing $spacing / 2;
	box-shadow: 0 0 5px $shadow-color;

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
			font-size: 14px;
		}
	}

	& > .footer {
		overflow: hidden;
		transition: max-height ease .5s;
		max-height: 0;

		&.expand {
			max-height: 350px;
		}

		& > .comments {
			max-height: 300px;
			overflow-y: auto;
			border-top: 1px solid #eee;
			background: #f9f9f9;
		}

		& > .inputbox {
			display: flex;
			flex-direction: column;
			position: relative;
			box-shadow: 0 -.5px 0 0 rgba(0,0,0,.25);

			& > .section {
				flex: 1;
				font-size: 14px;
				height: 100px;
				border: none;
				border-bottom: 1px solid #ddd;
			}

			& > .btn-group {
				display: flex;
				justify-content: space-between;
			}
		}
	}
}


.secondary {
	color: #999;
	font-size: 12px;
}
</style>
