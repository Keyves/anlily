import * as types from './types'
import forums from 'src/conf/forums'
import { clone } from 'src/utils'

const initialPost = {
	text: '',
	images: [],
	tags: [],
	comments: []
}

const initialComment = {
	text: '',
	images: []
}

const initialUser = {
	username: '',
	email: '',
	password: ''
}

const initialState = {
	userinfo: clone(initialUser),
	status: {
		anonymousName: '佚名',
		authorizeVisible: true,
		editorVisible: false,
		category: '综合版1',
		logined: false
	},
	posts: [],
	post: clone(initialPost),
	comment: clone(initialComment),
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
		state.post = clone(initialPost)
		console.debug(state.post)
	},
	[types.ENTER_COMMENT_FETCH_SUCCESS] (state, [comment, postIndex]) {
		state.posts[postIndex].comments.push(clone(comment))
		state.comment = clone(initialComment)
	},
	[types.DELETE_POST_FETCH_SUCCESS] (state, postIndex) {
		state.posts.splice(postIndex, 1)
	},
	[types.DELETE_COMMENT_FETCH_SUCCESS] (state, [postIndex, commentIndex]) {
		state.posts[postIndex].comments.splice(commentIndex, 1)
	},
	[types.LOGIN_SUCCESS] (state, user) {
		state.status.logined = true
		state.userinfo = clone(state.userinfo, user)
	},
	[types.LOGOUT_SUCCESS] (state) {
		state.status.logined = false
		state.userinfo = clone(initialUser)
	}
}



export default {
	state: initialState,
	mutations
}
