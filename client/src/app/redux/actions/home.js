import * as ActionTypes from 'app/redux/constants/ActionTypes'


export const changeText = (text) => ({
	type: ActionTypes.CHANGE_TEXT,
	text
})
