import * as types from './types'
import api from 'src/conf/api'
import { fetchAPI } from 'src/utils'
import { Notification } from 'src/components'
const notice = Notification.notice

export const changeUsernameText = ({commit}, value) => {
	commit(types.CHANGE_USERNAME_TEXT, value)
}

export const changePasswordText = ({commit}, value) => {
	commit(types.CHANGE_PASSWORD_TEXT, value)
}

export const changeEmailText = ({commit}, value) => {
	commit(types.CHANGE_EMAIL_TEXT, value)
}

export const register = async ({commit}, userinfo) => {
	try {
		const user = await fetchAPI(api.register, 'post', userinfo)

		notice('注册成功')
		commit(types.LOGIN_SUCCESS, user)
		commit(types.TOGGLE_AUTHORIZE_VISIBLE)
	} catch(e) {
		notice('注册失败，原因：' + e.message)
		throw e
	}
}

export const getLoginedUser = async ({commit}) => {
	try {
		const user = await fetchAPI(api.login, 'get')

		commit(types.LOGIN_SUCCESS, user)
		commit(types.TOGGLE_AUTHORIZE_VISIBLE)
	} catch(e) {
		throw e
	}
}

export const login = async ({commit}, userinfo) => {
	try {
		const user = await fetchAPI(api.login, 'post', userinfo)

		notice('登录成功')
		commit(types.LOGIN_SUCCESS, user)
		commit(types.TOGGLE_AUTHORIZE_VISIBLE)
	} catch(e) {
		notice('登录失败，原因：' + e.message)
		throw e
	}
}

export const logout = async ({commit}) => {
	try {
		await fetchAPI(api.logout, 'get')
		notice('登出成功')
		commit(types.LOGOUT_SUCCESS)
	} catch(e) {
		notice('登出失败，原因：' + e.message)
		throw e
	}
}

export const toggleAuthorizeVisible = ({commit}) => {
	commit(types.TOGGLE_AUTHORIZE_VISIBLE)
}


export const changePostText = ({commit}, value) => {
	commit(types.CHANGE_POST_CONTENT, value)
}

export const enterPostFetch = async ({commit, dispatch}, [category, post]) => {
	post.category = category

	try {
		const data = await fetchAPI(api.post, 'post', post)
		Object.assign(post, data)

		notice('发表成功')
		dispatch('toggleEditorVisible')
		commit(types.ENTER_POST_FETCH_SUCCESS, post)
	} catch(e) {
		notice('发表失败，原因：' + e.message)
		throw e
	}
}

export const deletePostFetch = async ({commit}, [postid, postIndex]) => {
	try {
		await fetchAPI(api.post, 'delete', {postid})
		notice('删除文章成功')
		commit(types.DELETE_POST_FETCH_SUCCESS, postIndex)
	} catch(e) {
		notice('删除文章失败，原因：' + e.message)
		throw e
	}
}

export const changeCommentText = ({commit}, value) => {
	commit(types.CHANGE_COMMENT_TEXT, value)
}

export const enterCommentFetch = async ({commit}, [postid, comment, postIndex]) => {
	try {
		const data = await fetchAPI([api.post, postid, 'comment'].join('/'), 'post', comment)
		Object.assign(comment, data)

		notice('评论成功')
		commit(types.ENTER_COMMENT_FETCH_SUCCESS, [comment, postIndex])
	} catch(e) {
		notice('评论失败，原因：' + e.message)
		throw e
	}
}

export const deleteCommentFetch = async ({commit}, [postid, postIndex, commentid, commentIndex]) => {
	try {
		await fetchAPI([api.post, postid, 'comment'].join('/'), 'delete', {commentid})
		notice('删除评论成功')
		commit(types.DELETE_COMMENT_FETCH_SUCCESS, [postIndex, commentIndex])
	} catch(e) {
		notice('删除评论失败，原因：' + e.message)
		throw e
	}
}

export const toggleEditorVisible = ({commit}) => {
	commit(types.TOGGLE_EDITOR_VISIBLE)
}

export const getPostsFetch = async ({commit}, category) => {
	try {
		const posts = await fetchAPI(api.post, 'get', {
			category
		})

		commit(types.GET_POSTS, posts)
	} catch(e) {
		notice('获取失败，原因：' + e.message)
		throw e
	}
}

export const changeCategoryAndGetPosts = async ({commit}, category) => {
	try {
		await getPostsFetch({commit}, category)
		commit(types.CHANGE_CATEGORY, category)
	} catch(e) {
		notice('更改失败，原因：' + e.message)
		throw e
	}
}
