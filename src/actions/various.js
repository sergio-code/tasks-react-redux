import {
	SET_PAGE,
	SET_SORTING,
	SHOW_TASK_FORM,
	CLOSE_TASK_FORM,
	SET_CURRENT_TASK
} from './types'

export const setPage = (page) => {
	return {
		type: SET_PAGE,
		payload: page
	}
}

export const setSorting = (sorting) => {
	return {
		type: SET_SORTING,
		payload: sorting
	}
}

export const showTaskForm = () => {
	return {
		type: SHOW_TASK_FORM
	}
}

export const closeTaskForm = () => {
	return {
		type: CLOSE_TASK_FORM
	}
}

export const setCurrentTask = () => {
	return {
		type: SET_CURRENT_TASK
	}
}
