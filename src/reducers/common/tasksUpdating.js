import {
	EDIT_TASK,
	EDIT_TASK_SUCCESS,
	EDIT_TASK_FAILURE
} from '../../actions/types'

const initState = {}

export default (state = initState, action) => {
	switch (action.type) {
		case EDIT_TASK:
			return {
				...state,
				[action.payload.id]: { submitting: true, error: null }
			}

		case EDIT_TASK_SUCCESS:
			return {
				...state,
				[action.payload.id]: { submitting: false, error: null }
			}

		case EDIT_TASK_FAILURE:
			return {
				...state,
				[action.payload.id]: {
					submitting: false,
					error: action.payload.error
				}
			}

		default:
			return state
	}
}
