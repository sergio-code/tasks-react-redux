import { SET_PAGE } from '../actions/types'

const initState = 1

export default (state = initState, action) => {
	switch (action.type) {
		case SET_PAGE:
			return action.payload !== undefined ? action.payload : state

		default:
			return state
	}
}
