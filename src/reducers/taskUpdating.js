import {
	EDIT_TASK_ACTION,
	EDIT_TASK_SUCCESS,
	EDIT_TASK_FAILURE
} from '../actions/types'

const initState = {
	submitting: false,
	error: null
}

export default (state = initState, action) => {
	switch (action.type) {
		case EDIT_TASK_ACTION:
			return { submitting: true, error: null }

		case EDIT_TASK_SUCCESS:
			return { submitting: false, error: null }

		case EDIT_TASK_FAILURE:
			return { submitting: false, error: action.payload }

		default:
			return state
	}
}
