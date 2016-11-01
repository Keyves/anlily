<template>
	<div class="container">
		<a-navigator></a-navigator>
		<div class="container-content">
			<a-sidebar class="content-sidebar"></a-sidebar>
			<div class="content-posts cols double">
				<div class="posts-col">
					<a-post class="post" v-for="post in leftColumnPosts" :index="post.index" :nickname="post.nickname" :agent="post.agent" :time="post.time" :text="post.text">
						<a-comment v-for="comment in post.comments" :index="comment.index" :nickname="comment.nickname" :agent="comment.agent" :time="comment.time" :text="comment.text"></a-comment>
					</a-post>
				</div>
				<div class="posts-col">
					<a-post class="post" v-for="post in rightColumnPosts" :index="post.index" :nickname="post.nickname" :agent="post.agent" :time="post.time" :text="post.text">
						<a-comment v-for="comment in post.comments" :index="comment.index" :nickname="comment.nickname" :agent="comment.agent" :time="comment.time" :text="comment.text"></a-comment>
					</a-post>
				</div>
			</div>
			<div class="content-posts cols single">
				<div class="posts-col">
					<a-post class="post" v-for="post in posts" :index="post.index" :nickname="post.nickname" :agent="post.agent" :time="post.time" :text="post.text">
						<a-comment v-for="comment in post.comments" :index="comment.index" :nickname="comment.nickname" :agent="comment.agent" :time="comment.time" :text="comment.text"></a-comment>
					</a-post>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="babel">
import Vue from 'vue'
import {
	mapState
} from 'vuex'
import DateUtil from 'src/utils/DateUtil'
import SideBar from './SideBar'
import Navigator from './Navigator'
import fakePosts from 'src/.temp/fakePosts'

export default {
	data() {
		let leftColumnPosts, rightColumnPosts, posts, i = 0, len = fakePosts.length
		leftColumnPosts = []
		rightColumnPosts = []
		posts = fakePosts
		console.log(leftColumnPosts, rightColumnPosts, posts)
		for (; i < len; i++) {
			// 1 right
			if (i % 2) {
				rightColumnPosts.push(posts[i])
			} else {
				leftColumnPosts.push(posts[i])
			}
		}
		console.log(leftColumnPosts, rightColumnPosts, posts)

		return {
			leftColumnPosts,
			rightColumnPosts,
			posts
		}
	},
	components: {
		'a-sidebar': SideBar,
		'a-navigator': Navigator
	}
}
</script>

<style lang="scss" scoped>
.container {
    &-content {
        margin-top: 60px;

		.content {
		    &-sidebar {
		        float: left;
		    }

			&-posts {
				&.cols.double {
					overflow: hidden;

					.posts-col {
						float: left;
						width: 50%;
						min-width: 500px;
						overflow: hidden;
					}
				}

				&.cols.single {
					overflow: hidden;

					.posts-col {
						margin: 0 auto;
						width: 50%;
						min-width: 500px;
						overflow: hidden;
					}
				}

				@media screen and (min-width:1200px) {
					&.cols.single {
						display: none;
					}
				}
				@media screen and (max-width:1199px) {
					&.cols.double {
						display: none;
					}
				}
			}
		}
    }
}
</style>
