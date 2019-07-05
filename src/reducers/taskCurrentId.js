import { SET_CURRENT_TASK } from '../actions/types'

export default (state = null, action) => {
	switch (action.type) {
		case SET_CURRENT_TASK:
			return action.payload !== undefined ? action.payload : state

		default:
			return state
	}
}
