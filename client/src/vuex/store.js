import * as types from './types'
import forums from 'src/conf/forums'
import reportTypes from 'src/conf/report-types'
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

const initialReport = {
	suspectid: -1,
	postid: -1,
	// ['色情', '辱骂', '广告', '其它']
	type: '',
	description: '',
	text: ''
}

const initialState = {
	userinfo: clone(initialUser),
	status: {
		anonymousName: '佚名',
		authorizeVisible: true,
		postEditorVisible: false,
		reportEditorVisible: false,
		category: '综合版1',
		logined: false
	},
	posts: [],
	reports: [],
	post: clone(initialPost),
	comment: clone(initialComment),
	report: clone(initialReport),
	forums,
	reportTypes
}

const userMutations = {
	[types.CHANGE_USERNAME_TEXT] (state, username) {
		state.userinfo.username = username
	},
	[types.CHANGE_PASSWORD_TEXT] (state, password) {
		state.userinfo.password = password
	},
	[types.CHANGE_EMAIL_TEXT] (state, email) {
		state.userinfo.email = email
	},
}

const statusMutations = {
	[types.LOGIN_SUCCESS] (state, user) {
		state.status.logined = true
		state.userinfo = clone(state.userinfo, user)
	},
	[types.LOGOUT_SUCCESS] (state) {
		state.status.logined = false
		state.userinfo = clone(initialUser)
	},
	[types.CHANGE_CATEGORY] (state, category) {
		state.status.category = category
	},
	[types.TOGGLE_AUTHORIZE_VISIBLE] (state) {
		state.status.authorizeVisible = !state.status.authorizeVisible
	},
	[types.TOGGLE_POST_EDITOR_VISIBLE] (state) {
		state.status.postEditorVisible = !state.status.postEditorVisible
	},
	[types.TOGGLE_REPORT_EDITOR_VISIBLE] (state) {
		state.status.reportEditorVisible = !state.status.reportEditorVisible
	}
}

const postMutations = {
	[types.INIT_POST] (state) {
		state.post = clone(initialPost)
	},
	[types.GET_POSTS_FETCH_SUCCESS] (state, posts) {
		console.debug(posts)
		state.posts = posts
	},
	[types.CHANGE_POST_CONTENT] (state, value) {
		state.post.text = value
	},
	[types.ENTER_POST_FETCH_SUCCESS] (state, post) {
		state.posts.push(clone(post))
		state.post = clone(initialPost)
	},
	[types.DELETE_POST_FETCH_SUCCESS] (state, postIndex) {
		state.posts.splice(postIndex, 1)
	},
	[types.CHANGE_COMMENT_TEXT] (state, value) {
		state.comment.text = value
	},
	[types.ENTER_COMMENT_FETCH_SUCCESS] (state, [comment, postIndex]) {
		state.posts[postIndex].comments.push(clone(comment))
		state.comment = clone(initialComment)
	},
	[types.DELETE_COMMENT_FETCH_SUCCESS] (state, [postIndex, commentIndex]) {
		state.posts[postIndex].comments.splice(commentIndex, 1)
	}
}

const reportMutations = {
	[types.INIT_REPORT] (state) {
		state.report = clone(initialReport)
	},
	[types.GET_REPORTS_FETCH_SUCCESS] (state, reports) {
		state.reports = reports
	},
	[types.READY_REPORT] (state, [suspectid, postid, text]) {
		state.report = clone(state.report, {suspectid, postid, text, type: state.reportTypes[0]})
	},
	[types.CHANGE_REPORT_TYPE] (state, type) {
		state.report.type = type
	},
	[types.CHANGE_REPORT_DESCRIPTION] (state, description) {
		state.report.description = description
	},
	[types.ENTER_REPORT_FETCH_SUCCESS] (state, report) {
		state.reports.push(clone(report))
		state.report = clone(initialReport)
	}
}

export default {
	state: initialState,
	mutations: {
		...userMutations,
		...statusMutations,
		...postMutations,
		...reportMutations
	}
}
