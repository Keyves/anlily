import * as types from './types'
import forums from 'src/conf/forums'
import { clone } from 'src/utils'

const initalPost = {
	text: '',
	images: [],
	tags: [],
	comments: []
}

const initalComment = {
	reply: 0,
	text: '',
	images: []
}

const initalState = {
	userinfo: {
		username: '',
		email: '',
		password: ''
	},
	status: {
		anonymousName: '佚名',
		authorizeVisible: true,
		editorVisible: false,
		category: '综合版1',
		logined: false
	},
	posts: [],
	post: clone(initalPost),
	comment: clone(initalComment),
	forums
}

const mutations = {
	[types.GET_POSTS] (state, posts) {
		state.posts = posts
	},
	[types.CHANGE_USERNAME_TEXT] (state, username) {
		state.userinfo.username = username
	},
	[types.CHANGE_PASSWORD_TEXT] (state, password) {
		state.userinfo.password = password
	},
	[types.CHANGE_EMAIL_TEXT] (state, email) {
		state.userinfo.email = email
	},
	[types.CHANGE_POST_CONTENT] (state, value) {
		state.post.text = value
	},
	[types.CHANGE_COMMENT_TEXT] (state, value) {
		console.debug(value)
		state.comment.text = value
	},
	[types.TOGGLE_EDITOR_VISIBLE] (state) {
		state.status.editorVisible = !state.status.editorVisible
	},
	[types.TOGGLE_AUTHORIZE_VISIBLE] (state) {
		state.status.authorizeVisible = !state.status.authorizeVisible
	},
	[types.CHANGE_CATEGORY] (state, category) {
		state.status.category = category
	},
	[types.ENTER_POST_FETCH_SUCCESS] (state, post) {
		state.posts.push(clone(post))
		state.post = clone(initalPost)
		console.debug(state.post)
	},
	[types.ENTER_COMMENT_FETCH_SUCCESS] (state, [comment, index]) {
		state.posts[index].comments.push(clone(comment))
		state.comment = clone(initalComment)
	},
	[types.LOGINED] (state, user) {
		state.status.logined = true
		state.userinfo = clone(state.userinfo, user)
	}
}



export default {
	state: initalState,
	mutations
}
