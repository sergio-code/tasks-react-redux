import { SET_SORTING } from '../actions/types'

const initState = {
	field: 'username',
	order: 'asc'
}

export default (state = initState, action) => {
	switch (action.type) {
		case SET_SORTING:
			return { ...state, ...action.payload }

		default:
			return state
	}
}
