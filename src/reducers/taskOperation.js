import { SET_CURRENT_OPERATION } from '../actions/types'

export default (state = null, action) => {
	switch (action.type) {
		case SET_CURRENT_OPERATION:
			return action.payload

		default:
			return state
	}
}
