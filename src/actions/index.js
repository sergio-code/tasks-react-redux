import {
	FETCH_TASKS_SUCCESS,
	FETCH_TASKS_FAILURE,
	FETCH_TASKS,
	// CREATE_TASK,
	// CREATE_TASK_SUCCESS,
	// CREATE_TASK_FAILURE,
	// EDIT_TASK,
	// EDIT_TASK_SUCCESS,
	// EDIT_TASK_FAILURE,
	SET_TASKS_PER_PAGE,
	SET_PAGE,
	SET_SORTING,
	SHOW_TASK_FORM,
	CLOSE_TASK_FORM,
	SET_CURRENT_TASK
} from './types'

import * as client from '../apis/tasks'

// FETCH_TASKS
export const fetchTasks = () => async (dispatch, getState) => {
	dispatch({ type: FETCH_TASKS })

	const { page, sorting } = getState().tasksNavigation

	try {
		// WORKAROUND
		// LOAD FIRST PAGE TO KNOW HOW MANY ITEMS PER PAGE
		if (page !== 1) {
			const { data, status, statusText } = await client.get({
				...sorting,
				page: 1
			})
			if (status < 200 && status >= 300) {
				console.error('Request was failed with status:', statusText)
				throw new Error('Network error')
			}
			if (data.status === 'ok') {
				const { tasks } = data.message
				dispatch({ type: SET_TASKS_PER_PAGE, payload: tasks.length })
			} else {
				console.error(data)
				dispatch({ type: FETCH_TASKS_FAILURE, payload: data.message })
			}
		}
		// LOAD PAGE
		const { data, status, statusText } = await client.get({
			...sorting,
			page
		})

		if (status < 200 && status >= 300) {
			console.error('Request was failed with status:', statusText)
			throw new Error('Network error')
		}

		if (data.status === 'ok') {
			const { tasks, total_task_count } = data.message
			dispatch({
				type: FETCH_TASKS_SUCCESS,
				payload: {
					items: tasks,
					total: parseInt(total_task_count, 10)
				}
			})
			if (page === 1) {
				dispatch({ type: SET_TASKS_PER_PAGE, payload: tasks.length })
			}
		} else {
			console.error(data)
			dispatch({
				type: FETCH_TASKS_FAILURE,
				payload: data.message
			})
		}
	} catch (error) {
		console.error(error)
		dispatch({
			type: FETCH_TASKS_FAILURE,
			payload: error.message
		})
	}
}

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
