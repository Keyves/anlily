<template>
	<div class="article">
		<div class="header" @click="changeExpandStatus">
			<span class="id secondary">{{'#' + id}}</span>
			<span class="username">{{username}}</span>
			<span class="created-time secondary">{{distanceNow}}</span>
			<span class="comment-number secondary">{{commentNumber}}</span>
			<c-button color="default" icon="more_vert"></c-button>
			<c-button color="default" icon="error_outline" @click.stop="handleReport"></c-button>
		</div>
		<div class="section" @click="changeExpandStatus">
			<!-- <div>{{text}}</div> -->
			<a-token v-for="token in tokens" :type="token.type" :value="token.value"></a-token>
		</div>
		<div class="toolbar">
			<div class="left">
				<c-button icon="reply"></c-button>
			</div>
			<div class="right">
				<c-button icon-color="error" icon="delete" v-if="admin" @click="handleRemove"></c-button>
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
					<textarea class="section atwho" type="text" :value="value" @input="handleReview" placeholder="输入内容限100字"></textarea>
				</div>
				<div class="btn-group">
					<c-button icon="photo"></c-button>
					<c-button color="info" @click="handleSend">发送</c-button>
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

const data = ['what', 'keyves', 'sha']
/*
[{
	username: 'what',
	userid: '10001'
}, {
	username: 'keyves',
	userid: '10001'
}, {
	username: 'bluesky',
	userid: '10001'
}]
*/

export default {
	name: 'a-post',
	props: {
		admin: Boolean,
		id: Number,
		username: String,
		commentNumber: Number,
		createdTime: String,
		text: String,
		expand: {
			type: Boolean,
			default: true
		}
	},
	data() {
		console.log(parseText(this.text), this.text)
		return {
			tokens: parseText(this.text),
			value: '',
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
		handleReview(e) {
			this.value = e.target.value
			this.$emit('review', e)
		},
		handleSend(e) {
			this.value = ''
			this.$emit('send', e)
		},
		handleRemove(e) {
			this.$emit('remove', e)
		},
		handleReport(e) {
			this.$emit('report', e)
		}
	},
	created() {
		$('.atwho').atwho({
			at: '@',
			displayTpl: '<li>${username}</li>',
			insertTpl: '@[${username}:${userid}]',
			data
		})
	},
	components: {
		'a-token': Token
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
			position: relative;

			& > .content {
				position: relative;
				height: $height-section;

				& > .section {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					font-size: 14px;
					height: $height-section;
					border: none;
					outline: none;
					border: 1px solid #eee;
					padding: 10px;
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
</style>
