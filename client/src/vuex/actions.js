import * as types from './types'
import api from 'src/conf/api'
import { fetchAPI } from 'src/utils'
import { Notification } from 'src/components'
const notice = Notification.notice
global.notice = notice
// status
export const getLoginedUser = async ({commit}) => {
	try {
		const user = await fetchAPI(api.login, 'get')

		commit(types.LOGIN_SUCCESS, user)
		commit(types.TOGGLE_AUTHORIZE_VISIBLE)
		notice('登录成功')
	} catch(e) {
		throw e
	}
}

export const logout = async ({commit}) => {
	try {
		await fetchAPI(api.logout, 'delete')

		commit(types.LOGOUT_SUCCESS)
		notice('登出成功')
	} catch(e) {
		notice('登出失败，原因：' + e.message)
		throw e
	}
}

export const toggleAuthorizeVisible = ({commit}) => {
	commit(types.TOGGLE_AUTHORIZE_VISIBLE)
}

export const changeCategoryAndGetPosts = async ({commit, dispatch}, category) => {
	try {
		await dispatch('getPostsFetch', category)

		commit(types.CHANGE_CATEGORY, category)
	} catch(e) {
		notice('更改失败，原因：' + e.message)
		throw e
	}
}

export const changeCategoryAndGetReportsFetch = async ({commit, dispatch}, category) => {
	try {
		await dispatch('getReportsFetch')

		commit(types.CHANGE_CATEGORY, category)
	} catch(e) {
		notice('更换失败，原因：' + e.message)
		throw e
	}
}

export const togglePostEditorVisible = ({commit}) => {
	commit(types.TOGGLE_POST_EDITOR_VISIBLE)
}

export const toggleReportEditorVisible = ({commit}) => {
	commit(types.TOGGLE_REPORT_EDITOR_VISIBLE)
}



// user
export const changeUsernameText = ({commit}, value) => {
	commit(types.CHANGE_USERNAME_TEXT, value)
}

export const changePasswordText = ({commit}, value) => {
	commit(types.CHANGE_PASSWORD_TEXT, value)
}

export const changeEmailText = ({commit}, value) => {
	commit(types.CHANGE_EMAIL_TEXT, value)
}

export const register = async ({commit}, user) => {
	try {
		const user = await fetchAPI(api.register, 'post', user)

		commit(types.LOGIN_SUCCESS, user)
		commit(types.TOGGLE_AUTHORIZE_VISIBLE)
		notice('注册成功')
	} catch(e) {
		notice('注册失败，原因：' + e.message)
		throw e
	}
}

export const login = async ({commit}, user) => {
	try {
		const user = await fetchAPI(api.login, 'post', user)

		commit(types.LOGIN_SUCCESS, user)
		commit(types.TOGGLE_AUTHORIZE_VISIBLE)
		notice('登录成功')
	} catch(e) {
		notice('登录失败，原因：' + e.message)
		throw e
	}
}


// report
export const getReportsFetch = async ({commit}) => {
	try {
		const reports = await fetchAPI(api.report, 'get')
		commit(types.GET_REPORTS_FETCH_SUCCESS, reports)
	} catch(e) {
		notice('获取举报函失败：' + e.message)
		throw e
	}
}

export const readyReport = ({commit}, {suspectid, postid, commentid, text}) => {
	commit(types.READY_REPORT, {suspectid, postid, commentid, text})
	commit(types.TOGGLE_REPORT_EDITOR_VISIBLE)
}

export const cancelReadyReport = async ({commit, dispatch}) => {
	commit(types.INIT_REPORT)
	dispatch('toggleReportEditorVisible')
}

export const changeReportType = ({commit}, value) => {
	commit(types.CHANGE_REPORT_TYPE, value)
}

export const changeReportDescription = ({commit}, value) => {
	commit(types.CHANGE_REPORT_DESCRIPTION, value)
}

export const enterReportFetch = async ({commit}, report) => {
	try {
		const data = await fetchAPI(api.report, 'post', report)
		Object.assign(report, data)

		commit(types.ENTER_REPORT_FETCH_SUCCESS, report)
		commit(types.TOGGLE_REPORT_EDITOR_VISIBLE)
		notice('举报成功')
	} catch(e) {
		notice('举报失败，原因：' + e.message)
		throw e
	}
}

export const invokeReportFetch = async ({commit}, reportid) => {
	try {
		await fetchAPI([api.report, 'invoke'].join('/'), 'delete', {reportid})
		commit(types.INVOKE_REPORT_FETCH_SUCCESS, reportid)
		notice('处理成功')
	} catch(e) {
		notice('处理失败，原因：' + e.message)
	}
}

export const revokeReportFetch = async ({commit}, reportid) => {
	try {
		await fetchAPI(api.report, 'delete', {reportid})
		commit(types.REVOKE_REPORT_FETCH_SUCCESS, reportid)
		notice('撤销成功')
	} catch(e) {
		notice('撤销失败，原因：' + e.message)
	}
}


// post
export const getPostsFetch = async ({commit}, category) => {
	try {
		const posts = await fetchAPI(api.post, 'get', {category})

		commit(types.GET_POSTS_FETCH_SUCCESS, posts)
	} catch(e) {
		notice('获取失败，原因：' + e.message)
		throw e
	}
}

export const getPostDetailFetch = async ({commit, dispatch}, postid) => {
	try {
		const post = await fetchAPI(api.post, 'get', {postid})

		dispatch('changePostDetail', post)
	} catch(e) {
		notice('获取失败，原因：' + e.message)
		throw e
	}
}

export const changePostText = ({commit}, value) => {
	commit(types.CHANGE_POST_CONTENT, value)
}

export const enterPostFetch = async ({commit, dispatch}, {category, post}) => {
	post.category = category

	try {
		const data = await fetchAPI(api.post, 'post', post)
		Object.assign(post, data)

		dispatch('togglePostEditorVisible')
		commit(types.ENTER_POST_FETCH_SUCCESS, post)
		notice('发表成功')
	} catch(e) {
		notice('发表失败，原因：' + e.message)
		throw e
	}
}

export const cancelPostFetch = async ({commit, dispatch}) => {
	commit(types.INIT_POST)
	dispatch('togglePostEditorVisible')
}

export const deletePostFetch = async ({commit}, postid) => {
	try {
		await fetchAPI(api.post, 'delete', {postid})

		commit(types.DELETE_POST_FETCH_SUCCESS, postid)
		notice('删除文章成功')
	} catch(e) {
		notice('删除文章失败，原因：' + e.message)
		throw e
	}
}

export const changeCommentText = ({commit}, value) => {
	commit(types.CHANGE_COMMENT_TEXT, value)
}

export const enterCommentFetch = async ({commit}, {postid, comment}) => {
	try {
		const data = await fetchAPI([api.post, postid, 'comment'].join('/'), 'post', comment)
		Object.assign(comment, data)

		commit(types.ENTER_COMMENT_FETCH_SUCCESS, {postid, comment})
		notice('评论成功')
	} catch(e) {
		notice('评论失败，原因：' + e.message)
		throw e
	}
}

export const deleteCommentFetch = async ({commit}, {postid, commentid}) => {
	try {
		await fetchAPI([api.post, postid, 'comment'].join('/'), 'delete', {commentid})

		commit(types.DELETE_COMMENT_FETCH_SUCCESS, {postid, commentid})
		notice('删除评论成功')
	} catch(e) {
		notice('删除评论失败，原因：' + e.message)
		throw e
	}
}

export const changePostDetail = async ({commit, dispatch}, post) => {
	commit(types.CHANGE_POST_DETAIL, post)
	dispatch('togglePostDetailVisible')
}

export const togglePostDetailVisible = ({commit}) => {
	commit(types.TOGGLE_POST_DETAIL_VISIBLE)
}
