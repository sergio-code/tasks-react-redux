import {
	CREATE_TASK,
	CREATE_TASK_SUCCESS,
	CREATE_TASK_FAILURE
} from '../../actions/types'

const initState = {
	submitting: false,
	error: null
}

export default (state = initState, action) => {
	switch (action.type) {
		case CREATE_TASK:
			return { submitting: true, error: null }

		case CREATE_TASK_SUCCESS:
			return { submitting: false, error: null }

		case CREATE_TASK_FAILURE:
			return { submitting: false, error: action.payload }

		default:
			return state
	}
}
