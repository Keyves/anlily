import { fromJS } from 'immutable'
import * as ActionTypes from 'app/redux/constants/ActionTypes'

const homeState = fromJS({
	text: 'something'
})

export default function handle(state = homeState, action) {
	return ({
		[ActionTypes.CHANGE_TEXT]: () => {
			return state.set('text', action.text)
		}
	}[action.type] || (() => state))()
}
