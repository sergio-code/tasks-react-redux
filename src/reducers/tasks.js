import { mapKeys } from 'lodash'
import {
	FETCH_TASKS,
	FETCH_TASKS_SUCCESS,
	FETCH_TASKS_FAILURE
} from '../actions/types'

const initialState = {
	items: {},
	total: 0,
	error: null,
	loading: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TASKS:
			return { ...state, loading: true }

		case FETCH_TASKS_SUCCESS:
			const { items, total } = action.payload
			return {
				...state,
				items: mapKeys(items, 'id'),
				total,
				loading: false
			}

		case FETCH_TASKS_FAILURE:
			return { ...state, error: action.payload, loading: false }

		default:
			return state
	}
}
