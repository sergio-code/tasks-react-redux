import { mapKeys } from 'lodash'
import {
	FETCH_TASKS_DATA,
	FETCH_TASKS_SUCCESS,
	FETCH_TASKS_FAILURE,
	EDIT_TASK_SUCCESS
} from '../actions/types'

const initialState = {
	items: {},
	loading: false,
	error: null
}

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TASKS_DATA:
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

		case EDIT_TASK_SUCCESS: {
			const { payload } = action
			const item = state.items[payload.id]
			if (item) {
				const updatedItem = { ...item, ...payload }
				return {
					...state,
					items: {
						...state.items,
						[payload.id]: updatedItem
					}
				}
			} else {
				return state
			}
		}

		default:
			return state
	}
}
