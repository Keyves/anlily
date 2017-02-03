<template>
	<div class="a-post-detail" v-show="postDetailVisible">
		<div class="a-post-detail-bg" @click="togglePostDetailVisible"></div>
		<a-post
			class="a-post-detail-main"
			:admin="admin"
			:id="postDetail._id"
			:username="postDetail.username"
			:agent="postDetail.agent"
			:created-time="postDetail.createdTime"
			:text="postDetail.text"
			:comments="postDetail.comments"
			@report="readyReport({userid: comment.userid, postid: postDetail._id, text: postDetail.text})"
			@review="changeCommentText($event.target.value)"
			@send="enterCommentFetch({postid: postDetail._id, comment})"
			@remove="deletePostFetch(postDetail._id)"
			>
			<a-post-comment
				v-for="comment in postDetail.comments"
				:id="comment._id"
				:reply="comment.reply"
				:username="comment.username"
				:agent="comment.agent"
				:created-time="comment.createdTime"
				:text="comment.text"
				:comments="postDetail.comments"
				@report="readyReport({suspectid: comment.userid, postid: postDetail._id, commentid: comment._id, text: postDetail.text})"
				@remove="deleteCommentFetch({postid: postDetail._id, commentid: comment._id})"
				>
			</a-post-comment>
		</a-post>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Post from './Post'
import Comment from './Comment'

export default {
	name: 'a-post-detail',
	computed: {
		...mapState(['comment', 'postDetail']),
		...mapState({
			postDetailVisible: state => state.status.postDetailVisible,
			role: state => state.user.role
		}),
		admin() {
			return this.role === 1123
		}
	},
	methods: {
		...mapActions([
			'togglePostDetailVisible',
			'readyReport',
			'changeCommentText',
			'enterCommentFetch',
			'deleteCommentFetch',
		])
	},
	components: {
		'a-post': Post,
		'a-post-comment': Comment
	}
}
</script>

<style lang="scss">
.a-post-detail {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 50;

	&-bg {
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.25);
	}

	&-main {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 600px;
		transform: translateY(-50%) translateX(-50%);
		border-radius: 5px;
		background: white;
	}
}
</style>
