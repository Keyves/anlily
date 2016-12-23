<template>
	<div class="a-post-waterfall" ref="waterfall">
		<div class="col" v-for="posts in cols">
			<a-post
				class="post"
				v-for="post in posts"
				:admin="admin"
				:id="post._id"
				:username="post.username"
				:agent="post.agent"
				:created-time="post.createdTime"
				:text="post.text"
				:comments="post.comments"
				@report="readyReport({userid: post.userid, postid: post._id, text: post.text})"
				@review="changeCommentText($event.target.value)"
				@send="enterCommentFetch({postid: post._id, comment})"
				@remove="deletePostFetch(post._id)"
				@detail="changePostDetail(post)"
				>
				<a-post-comment
					v-for="comment in getTopTwoComments(post.comments)"
					:id="comment._id"
					:reply="comment.reply"
					:username="comment.username"
					:agent="comment.agent"
					:created-time="comment.createdTime"
					:text="comment.text"
					:comments="post.comments"
					@report="readyReport({suspectid: comment.userid, postid: post._id, commentid: comment._id, text: post.text})"
					@remove="deleteCommentFetch({postid: post._id, commentid: comment._id})"
					>
				</a-post-comment>
				<div v-if="getRestCommentsNumber(post.comments)">
					<div
						class="btn toggle-rest-comment"
						v-show="!restCommentVisible"
						@click="toggleRestCommentsVisible"
						>
						{{getRestCommentsNumber(post.comments) + '条评论已隐藏'}}
					</div>
					<a-post-comment
						v-show="restCommentVisible"
						v-for="comment in getRestComments(post.comments)"
						:id="comment._id"
						:reply="comment.reply"
						:username="comment.username"
						:agent="comment.agent"
						:created-time="comment.createdTime"
						:text="comment.text"
						:comments="post.comments"
						@report="readyReport({suspectid: comment.userid, postid: post._id, commentid: comment._id, text: post.text})"
						@remove="deleteCommentFetch({postid: post._id, commentid: comment._id})"
						>
					</a-post-comment>
				</div>
				<a-post-comment
					v-for="comment in getLastTwoComments(post.comments)"
					:id="comment._id"
					:reply="comment.reply"
					:username="comment.username"
					:agent="comment.agent"
					:created-time="comment.createdTime"
					:text="comment.text"
					:comments="post.comments"
					@report="readyReport({suspectid: comment.userid, postid: post._id, commentid: comment._id, text: post.text})"
					@remove="deleteCommentFetch({postid: post._id, commentid: comment._id})"
					>
				</a-post-comment>
			</a-post>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { throttle } from 'src/utils'
import Waterfall from 'src/containers/mixins/Waterfall'
import DateLib from 'src/lib/DateLib'
import Post from './Post'
import Comment from './Comment'

export default {
	name: 'a-post-waterfall',
	computed: {
		...mapState(['comment', 'posts']),
		...mapState({
			role: state => state.user.role,
		}),
		admin() {
			return this.role === 1123
		},
		items() {
			return this.posts
		}
	},
	mixins: [Waterfall],
	methods: {
		...mapActions([
			'enterCommentFetch',
			'changeCommentText',
			'getPostsFetch',
			'deletePostFetch',
			'deleteCommentFetch',
			'readyReport',
			'changePostDetail'
		]),
		getTopTwoComments(arr) {
			return arr.slice(0, 2)
		},
		getLastTwoComments(arr) {
			// 获取除最初的两位以外的最后两位 以下等同于 arr.slice(2).slice(-2)
			const len = arr.length > 4 ? 2 : arr.length - 2
			return len > 0 ? arr.slice(-len) : []
		},
		getRestComments(arr) {
			return arr.slice(2, -2)
		},
		getRestCommentsNumber(arr) {
			const number = arr.length - 4
			return number > 0 ? number : 0
		},
		toggleRestCommentsVisible() {
			this.restCommentVisible = !this.restCommentVisible
		}
	},
	created() {
		this.getPostsFetch('综合版1')
	},
	components: {
		'a-post': Post,
		'a-post-comment': Comment
	}
}
</script>
<style lang="scss">
@import "~src/variables";

.a-post-waterfall {
	overflow: hidden;
	display: flex;
	min-width: 500px;
	justify-content: center;

	& > .col {
		width: 50%;
		min-width: 500px;
		overflow: hidden;
	}

	.btn.toggle-rest-comment {
		text-align: center;
		font-size: 10px;
		color: $color-info;
	}
}
</style>
