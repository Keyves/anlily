import * as types from './types'
import forums from 'src/conf/forums'
import reportTypes from 'src/conf/report-types'
import { clone } from 'src/utils'

const initialPost = {
	text: '',
	comments: []
}

const initialPostDetail = {
	_id: 0,
	category: '',
	comments: [],
	createdTime: new Date().toString(),
	ip: '',
	text: 'v',
	tokens: [],
	userid: 0,
	username: '',
}

const initialComment = {
	text: ''
}

const initialUser = {
	username: '',
	email: '',
	password: ''
}

const initialReport = {
	suspectid: -1,
	postid: -1,
	commentid: -1,
	// ['色情', '辱骂', '广告', '其它']
	type: '',
	description: '',
	text: ''
}

const initialState = {
	user: clone(initialUser),
	status: {
		anonymousName: '佚名',
		authorizeVisible: true,
		reportEditorVisible: false,
		postEditorVisible: false,
		postDetailVisible: false,
		category: '综合版1',
		logined: false
	},
	posts: [],
	reports: [],
	post: clone(initialPost),
	postDetail: clone(initialPostDetail),
	comment: clone(initialComment),
	report: clone(initialReport),
	forums,
	reportTypes
}

const userMutations = {
	[types.CHANGE_USERNAME_TEXT] (state, username) {
		state.user.username = username
	},
	[types.CHANGE_PASSWORD_TEXT] (state, password) {
		state.user.password = password
	},
	[types.CHANGE_EMAIL_TEXT] (state, email) {
		state.user.email = email
	},
}

const statusMutations = {
	[types.LOGIN_SUCCESS] (state, user) {
		state.status.logined = true
		state.user = clone(state.user, user)
	},
	[types.LOGOUT_SUCCESS] (state) {
		state.status.logined = false
		state.user = clone(initialUser)
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
	[types.TOGGLE_POST_DETAIL_VISIBLE] (state) {
		state.status.postDetailVisible = !state.status.postDetailVisible
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
		state.posts = posts
	},
	[types.CHANGE_POST_CONTENT] (state, value) {
		state.post.text = value
	},
	[types.ENTER_POST_FETCH_SUCCESS] (state, post) {
		state.posts.push(clone(post))
		state.post = clone(initialPost)
	},
	[types.DELETE_POST_FETCH_SUCCESS] (state, postid) {
		state.posts = state.posts.filter(v => v._id !== postid)
	},
	[types.CHANGE_POST_DETAIL] (state, post) {
		state.postDetail = post
	},
	[types.CHANGE_COMMENT_TEXT] (state, value) {
		state.comment.text = value
	},
	[types.ENTER_COMMENT_FETCH_SUCCESS] (state, {postid, comment}) {
		const post = state.posts.find(v => v._id === postid)
		post && post.comments.push(clone(comment))
		state.comment = clone(initialComment)
	},
	[types.DELETE_COMMENT_FETCH_SUCCESS] (state, {postid, commentid}) {
		const post = state.posts.find(v => v._id === postid)
		post && (post.comments = post.comments.filter(v => v._id !== commentid))
	}
}

const reportMutations = {
	[types.INIT_REPORT] (state) {
		state.report = clone(initialReport)
	},
	[types.GET_REPORTS_FETCH_SUCCESS] (state, reports) {
		state.reports = reports
	},
	[types.READY_REPORT] (state, {suspectid, postid, text, commentid}) {
		state.report = clone(state.report, {suspectid, postid, commentid, text, type: state.reportTypes[0]})
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
	},
	[types.INVOKE_REPORT_FETCH_SUCCESS] (state, reportid) {
		state.reports = state.reports.filter(v => v._id !== reportid)
	},
	[types.REVOKE_REPORT_FETCH_SUCCESS] (state, reportid) {
		state.reports = state.reports.filter(v => v._id !== reportid)
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
