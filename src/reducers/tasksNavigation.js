import { SET_TASKS_NAVIGATION } from '../actions/types'

const initState = {
	sortField: 'status',
	sortDirection: 'asc',
	currentPage: 1,
	itemsPerPage: null,
	total: null
}

export default (state = initState, action) => {
	switch (action.type) {
		case SET_TASKS_NAVIGATION:
			return { ...state, ...action.payload }

		default:
			return state
	}
}
