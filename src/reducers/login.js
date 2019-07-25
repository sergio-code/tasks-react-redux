import {
	SIGN_OUT,
	SIGN_IN_ACTION,
	SIGN_IN_SUCCESS,
	SIGN_IN_FAILURE
} from '../actions/types'

const initState = {
	error: null,
	token: null,
	username: null,
	dateOfIssue: null,
	isLoggedIn: false,
	submitting: false
}

export default (state = initState, action) => {
	switch (action.type) {
		case SIGN_OUT:
			return initState

		case SIGN_IN_ACTION:
			return { ...initState, submitting: true, isLoggedIn: false }

		case SIGN_IN_SUCCESS:
			return {
				...state,
				...action.payload,
				error: null,
				submitting: false,
				isLoggedIn: true
			}

		case SIGN_IN_FAILURE:
			return {
				...initState,
				error: action.payload.error,
				submitting: false,
				isLoggedIn: false
			}

		default:
			return state
	}
}
