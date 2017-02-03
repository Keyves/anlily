<template>
	<div class="report">
		<div class="header">
			<div class="report-postid">
				<div class="title">文章编号：</div>
				<c-button class="content" color="default">{{postid}}</c-button>
			</div>
			<div class="report-suspectid">
				<div class="title">嫌疑人：</div>
				<c-button class="content" color="default">{{suspectid}}</c-button>
			</div>
			<div class="report-type">
				<div class="title">类型：</div>
				<div class="content">{{type}}</div>
			</div>
		</div>
		<div class="body">
			<div class="report-text">
				<div class="title">内容：</div>
				<div class="content">{{text}}</div>
			</div>
			<div class="report-description">
				<div class="title">描述：</div>
				<div class="content">{{description}}</div>
			</div>
		</div>
		<div class="footer">
			<span class="report-createdTime secondary">{{distanceNow}}</span>
			<span v-if="admin">
				<c-button color="default" @click="this.onRevoke">撤销</c-button>
				<c-button color="primary" @click="this.onInvoke">处理</c-button>
			</span>
		</div>
	</div>
</template>

<script>
import DateLib from 'src/lib/DateLib'

export default {
	name: 'a-report',
	props: {
		admin: Boolean,
		suspectid: Number,
		reporterid: Number,
		postid: Number,
		// ['色情', '辱骂', '广告', '其它']
		type: String,
		description: String,
		text: String,
		createdTime: String
	},
	computed: {
		distanceNow() {
			return DateLib.getDistanceNow(new Date(this.createdTime))
		}
	},
	methods: {
		onRevoke(e) {
			this.$emit('revoke', e)
		},
		onInvoke(e) {
			this.$emit('invoke', e)
		}
	}
}
</script>

<style lang="scss">
@import "~src/variables";

.report {
	background-color: white;
	margin: $spacing $spacing / 2;
	box-shadow: 0 0 5px $shadow-color;

	.title {
		font-size: 10px;
		margin-bottom: 5px;
	}

	& > .header {
		display: flex;
		border-bottom: 1px solid #ddd;

		& > * {
			flex: 1;
			padding: $spacing;

			&:nth-child(2) {
				border-left: 1px solid #ddd;
				border-right: 1px solid #ddd;
			}

			& > .content {
				font-size: 20px;
				padding: 0;
				line-height: 1;
			}
		}
	}

	& > .body {
		& > * {
			padding: $spacing;
			border-bottom: 1px solid #ddd;
		}
	}

	& > .footer {
		padding: $spacing;
		display: flex;
    	align-items: center;
		justify-content: space-between;
	}
}


</style>
