import { SET_TASKS_PER_PAGE } from '../actions/types'

export default (state = null, action) => {
	switch (action.type) {
		case SET_TASKS_PER_PAGE:
			return action.payload !== undefined ? action.payload : state

		default:
			return state
	}
}
