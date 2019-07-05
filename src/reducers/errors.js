import { SHOW_ERROR, REMOVE_ERROR } from '../actions/types'

export default (state = [], action) => {
	switch (action.type) {
		case SHOW_ERROR:
			return [...state, action.payload]

		case REMOVE_ERROR:
			return state.filter((_, i) => i !== action.payload)

		default:
			return state
	}
}
