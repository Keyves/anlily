<template>
	<div class="a-waterfall" ref="waterfall">
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
				@report="readyReport([post.userid, post._id, post.text])"
				@review="changeCommentText($event.target.value)"
				@send="enterCommentFetch([post._id, comment, post.index])"
				@remove="deletePostFetch([post._id, post.index])"
				>
				<a-comment
					v-for="comment in getTopTwoComments(post.comments)"
					:id="comment._id"
					:reply="comment.reply"
					:username="comment.username"
					:agent="comment.agent"
					:created-time="comment.createdTime"
					:text="comment.text"
					@remove="deleteCommentFetch([post._id, post.index, comment._id, comment.index])"
					>
				</a-comment>
				<div v-if="getRestCommentsNumber(post.comments)">
					<div
						class="btn toggle-rest-comment"
						v-show="!restCommentVisible"
						@click="toggleRestCommentsVisible"
						>
						{{getRestCommentsNumber(post.comments) + '条评论已隐藏'}}
					</div>
					<a-comment
						v-show="restCommentVisible"
						v-for="comment in getRestComments(post.comments)"
						:id="comment._id"
						:reply="comment.reply"
						:username="comment.username"
						:agent="comment.agent"
						:created-time="comment.createdTime"
						:text="comment.text"
						@remove="deleteCommentFetch([post._id, post.index, comment._id, comment.index])"
						>
					</a-comment>
				</div>
				<a-comment
					v-for="comment in getLastTwoComments(post.comments)"
					:id="comment._id"
					:reply="comment.reply"
					:username="comment.username"
					:agent="comment.agent"
					:created-time="comment.createdTime"
					:text="comment.text"
					@remove="deleteCommentFetch([post._id, post.index, comment._id, comment.index])"
					>
				</a-comment>
			</a-post>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { throttle } from 'src/utils'
import DateLib from 'src/lib/DateLib'
import Post from './Post'
const Comment = Post.Comment

export default {
	name: 'a-waterfall',
	props: {
		columnWidth: {
			type: Number,
			default: 500
		}
	},
	data() {
		return {
			column: 1,
			handler: null,
			restCommentVisible: false
		}
	},
	computed: {
		...mapState(['posts', 'comment']),
		...mapState({
			role: state => state.userinfo.role
		}),
		admin() {
			return this.role === 1123
		},
		cols() {
			let posts, post, comments, cols = [], columnNumber, i, j
			posts = this.posts
			columnNumber = this.column

			// 初始化文章列
			for (i = 0; i < columnNumber; i++)
				cols[i] = []

			// 分发文章到各个列中, 并给文章和评论设置索引index
			for (i = 0; i < posts.length; i++) {
				post = posts[i]
				post.index = i
				comments = post.comments
				for (j = 0; j < comments.length; j++) {
					comments[j].index = j
				}
				cols[i % columnNumber].push(post)
			}

			return cols
		}
	},
	methods: {
		...mapActions(['enterCommentFetch', 'changeCommentText', 'getPostsFetch', 'deletePostFetch', 'deleteCommentFetch', 'readyReport']),
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
	mounted() {
		const waterfall = this.$refs.waterfall
		const columnWidth = this.columnWidth
		let column

		// 节流，触发间隔至少为100ms
		const handler = throttle(() => {
			// 在当前瀑布流的宽度下容纳最大整数列数
			column = Math.floor(waterfall.offsetWidth / columnWidth)
			if (column !== this.column && column > 0) {
				this.column = column
			}
		}, 100)

		window.addEventListener('resize', handler, false)
		this.handler = handler
	},
	destroyed() {
		window.removeEventListener('resize', this.handler, false)
	},
	components: {
		'a-post': Post,
		'a-comment': Comment
	}
}
</script>
<style lang="scss">
@import "~src/variables";

.a-waterfall {
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
