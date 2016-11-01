import * as types from './types'

const state = {
	logined: true,
	loading: false,
	snack: {
		message: '',
		action: '',
		actionColor: '',
		duration: 2000
	},
	userinfo: {
		access_token: ''
	},
	page: {}
}

const baseMutations = {
	[types.SET_USERINFO] (state, userinfo){
		state.info = Object.assign({}, state.userinfo, userinfo)
	},
	[types.LOGIN] (state) {
		state.logined = true
	},
	[types.LOGOUT] (state) {
		state.logined = false
	},
	[types.ADD_SNACK] (state, option) {
		//option为新添加，可以不解构也能触发响应
		state.snack = Object.assign({}, state.snack, option)
	}
}

const statusMutations = {
	[types.LOADING_START] (state) {
		state.loading = true
	},
	[types.LOADING_END] (state) {
		state.loading = false
	}
}


const inputMutations = {
}



export default {
	state,
	mutations: {
		...baseMutations,
		...statusMutations,
		...inputMutations
	}
}
