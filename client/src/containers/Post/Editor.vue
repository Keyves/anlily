<template>
	<div>
		<c-button class="float-btn new-post" icon="edit" @click="togglePostEditorVisible"></c-button>
		<div class="editor" v-show="postEditorVisible">
			<div class="editor-bg" @click="togglePostEditorVisible"></div>
			<div class="editor-main">
				<div class="header">
					<span class="username">{{logined ? userinfo.username : '佚名'}}</span>
					<span class="category secondary">{{category}}</span>
				</div>
				<textarea class="section" type="text" :value="post.text" @input="changePostText($event.target.value)" placeholder="输入内容限100字"></textarea>
				<div class="footer">
					<div class="btn-group">
						<c-button icon="photo"></c-button>
						<c-button color="info" @click="enterPostFetch([category, post])">发送</c-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	name: 'a-editor',
	computed: {
		...mapState(['post', 'userinfo']),
		...mapState({
			postEditorVisible: state => state.status.postEditorVisible,
			category: state => state.status.category,
			logined: state => state.status.logined
		})
	},
	methods: {
		...mapActions(['changePostText', 'enterPostFetch', 'togglePostEditorVisible'])
	}
}
</script>

<style lang="scss">
@import "~src/variables";

.float-btn {
	position: fixed;

	&.new-post {
		right: 50px;
		bottom: 50px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		color: white;
		background: #db4437;
		box-shadow: 0 6px 10px 0 $shadow-color;
	}
}
.editor {
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

		& > .header {
			display: flex;
			padding: $spacing;
			align-items: center;
			justify-content: space-between;
			white-space: nowrap;

			& > .username {
				font-size: 16px;
				padding: 0 $spacing;
			}

			& > .category {
				flex: 1;
			}
		}

		& > .section {
			width: 100%;
			padding: 10px;
			border: none;
			min-height: 300px;
			max-height: 500px;
			outline: none;
			box-sizing: border-box;
			resize: vertical;
		}

		& > .footer {
			display: flex;
			align-items: center;
			height: 50px;
			border-top: 1px solid #ddd;

			& > .btn-group {
				display: flex;
			    flex: 1;
			    padding: 0 10px;
				justify-content: space-between;
				box-sizing: border-box;
			}
		}
	}
}
</style>
