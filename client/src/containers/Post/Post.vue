<template>
	<div class="article">
		<div class="header" @click="changeExpandStatus">
			<span class="id secondary">{{'#' + id}}</span>
			<span class="username">{{username}}</span>
			<span class="created-time secondary">{{distanceNow}}</span>
			<span class="comment-number secondary">{{commentNumber}}</span>
			<c-button color="default" icon="more_vert"></c-button>
			<c-button color="default" icon="error_outline" @click.stop="onReport"></c-button>
		</div>
		<div class="section" @click="changeExpandStatus">
			<a-token v-for="token in tokens" :type="token.type" :value="token.value"></a-token>
		</div>
		<div class="toolbar">
			<div class="left">
				<c-button icon="reply"></c-button>
			</div>
			<div class="right">
				<c-button icon-color="error" icon="delete" v-if="admin" @click="onRemove"></c-button>
				<c-button icon="message" @click="toggleInputboxVisible"></c-button>
				<c-button icon="details"></c-button>
			</div>
		</div>
		<div class="footer" :class="expandStatus ? 'expand' : ''">
			<div class="comments">
				<slot></slot>
			</div>
			<div class="inputbox" v-show="inputboxVisible">
				<div class="content">
					<!-- <div ref="atwho" class="section atwho" contenteditable v-html="editorValue"></div> -->
					<textarea ref="atwho" class="section atwho" :value="editorValue">
				</div>
				<div class="btn-group">
					<c-button icon="photo"></c-button>
					<c-button color="info" @click="onSend">发送</c-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import DateLib from 'src/lib/DateLib'
import Token from './Token.js'
import $ from 'jquery'
import parseText from './parseText'

var data = ["smile", "iphone", "girl", "smiley", "heart", "kiss", "copyright", "coffee"]

export default {
	name: 'a-post',
	props: {
		admin: Boolean,
		id: Number,
		username: String,
		commentNumber: Number,
		createdTime: String,
		text: String,
		comments: Array,
		expand: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			tokens: parseText(this.text),
			editorValue: '',
			expandStatus: this.expand,
			inputboxVisible: false
		}
	},
	computed: {
		distanceNow() {
			return DateLib.getDistanceNow(new Date(this.createdTime))
		}
	},
	methods: {
		toggleInputboxVisible() {
			this.expandStatus = true
			this.inputboxVisible = !this.inputboxVisible
		},
		changeExpandStatus() {
			this.inputboxVisible = false
			this.expandStatus = !this.expandStatus
		},
		onReview(e) {
			this.$emit('review', e)
		},
		onSend(e) {
			this.editorValue = ''
			this.$emit('send', e)
		},
		onRemove(e) {
			this.$emit('remove', e)
		},
		onReport(e) {
			this.$emit('report', e)
		}
	},
	mounted() {
		const { comments } = this, { atwho } = this.$refs, commentidArr = [], usernameArr = []
		let comment
		for (comment of comments) {
			commentidArr.push(comment._id)
			usernameArr.push(comment.username)
		}

		$(atwho)
			.on('DOMSubtreeModified', this.onReview)
			.atwho({
				at: '@',
				data: usernameArr
			})
			.atwho({
				at: '#',
				data: commentidArr
			})
	},
	components: {
		'a-token': Token
	}
}
</script>

<style lang="scss">
@import "~src/variables";

.article {
	background-color: #fff;
	margin: $spacing $spacing / 2;
	box-shadow: 0 0 5px $shadow-color;

	& > .header {
		display: flex;
		padding: $spacing $spacing 0 $spacing;
		align-items: center;
		justify-content: space-between;
		white-space: nowrap;

		& > .username {
			padding: 0 $spacing;
		}

		& > .created-time {
			flex: 1;
		}
	}

	& > .section {
		padding: $spacing;
		font-size: 14px;
		white-space: pre-wrap;
	}

	& > .toolbar {
		display: flex;
		justify-content: space-between;

		& > .left {
			text-align: left;
		}

		& > .right {
			display: flex;
			justify-content: flex-end;
		}
	}

	& > .footer {
		overflow: hidden;
		transition: max-height ease .5s;
		max-height: 0;

		$height-section: 100px;
		$height-btn-group: 50px;
		$height-comments: 500px;
		$height-expand: $height-section + $height-btn-group + $height-comments;

		&.expand {
			max-height: $height-expand;
		}

		& > .comments {
			max-height: $height-comments;
			overflow-y: auto;
			border-top: 1px solid #eee;
		}

		& > .inputbox {
			display: flex;
			flex-direction: column;

			& > .content {
				& > .section {
					width: 100%;
					height: $height-section;
					padding: 10px;
					font-size: 14px;
					outline: none;
					border: 1px solid #eee;
	    			box-sizing: border-box;
				}
			}

			& > .btn-group {
				display: flex;
				height: $height-btn-group;
				align-items: center;
				justify-content: space-between;
				padding: 0 10px;
				box-sizing: border-box;
			}
		}
	}
}

.atwho {
	& > &-inserted {
		color: $color-warning;
	}
}
</style>
