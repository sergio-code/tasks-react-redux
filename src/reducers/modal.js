import { SET_CURRENT_OPERATION, SET_CURRENT_TASK } from '../actions/types'

const initState = {
	taskOperation: null,
	taskCurrentId: null
}

export default (state = initState, action) => {
	switch (action.type) {
		case SET_CURRENT_OPERATION:
			return { ...state, taskOperation: action.payload }

		case SET_CURRENT_TASK:
			return {
				...state,
				taskCurrentId:
					action.payload !== undefined ? action.payload : state
			}

		default:
			return state
	}
}
