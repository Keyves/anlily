<template>
	<div class="a-report-editor" v-show="reportEditorVisible">
		<div class="a-report-editor-bg" @click="cancelReportFetch"></div>
		<div class="a-report-editor-main">
			<div class="header">
				<div class="postid">
					<div class="title">文章编号：</div>
					<c-button class="content" color="default">{{report.postid}}</c-button>
				</div>
				<div class="suspectid">
					<div class="title">嫌疑人：</div>
					<c-button class="content" color="default">{{report.suspectid}}</c-button>
				</div>
			</div>
			<div class="body">
				<div class="types">
					<span class="title">类型：</span>
					<span class="content">
						<span v-for="reportType in reportTypes" :class="reportType === report.type ? 'selected' : ''" @click="changeReportType(reportType)">{{reportType}}</span>
					</span>
				</div>
				<div class="text">
					<div class="title">内容：</div>
					<div class="content">{{report.text}}</div>
				</div>
				<div class="description">
					<div class="title">描述：</div>
					<textarea class="content" type="text" :value="report.description" placeholder="输入内容限100字..." @input="changeReportDescription($event.target.value)"></textarea>
				</div>
			</div>
			<div class="footer">
				<span class="createdTime secondary">{{report.distanceNow}}</span>
				<span>
					<c-button color="default" @click="cancelReportFetch">取消</c-button>
					<c-button color="primary" @click="enterReportFetch(report)">确认</c-button>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	name: 'a-report-editor',
	computed: {
		...mapState(['report', 'reportTypes']),
		...mapState({
			reportEditorVisible: state => state.status.reportEditorVisible
		})
	},
	methods: {
		...mapActions(['cancelReportFetch', 'changeReportType', 'changeReportDescription', 'enterReportFetch'])
	}
}
</script>

<style lang="scss">
@import "~src/variables";

.a-report-editor {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	&-bg {
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.25);
	}

	&-main {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 360px;
		transform: translateY(-50%) translateX(-50%);
		border-radius: 5px;
		background: white;
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

			& > .types {
				display: flex;

				& > .content {
					display: flex;
					flex: 1;

					& > * {
						flex: 1;
						text-align: center;
						margin: 0 $spacing;
						cursor: pointer;

						&.selected {
							border-radius: 2.5px;
							color: $color-primary;
							border: 1px solid $color-primary;
						}

						&:hover {
							opacity: .6;
						}
					}
				}
			}

			& > .description {
				& > .content {
					resize: none;
					border: none;
					width: 100%;
					font-size: 14px;
				}
			}
		}

		& > .footer {
			padding: $spacing;
			display: flex;
	    	align-items: center;
			justify-content: space-between;
		}
	}
}
</style>
