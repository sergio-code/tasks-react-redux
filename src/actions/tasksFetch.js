import {
	FETCH_TASKS_SUCCESS,
	FETCH_TASKS_FAILURE,
	FETCH_TASKS_ACTION,
	SET_TASKS_NAVIGATION
} from './types'

import { getTasksPage } from '../apis'

// FETCH_TASKS
export const tasksFetch = () => async (dispatch, getState) => {
	dispatch({ type: FETCH_TASKS_ACTION })

	const {
		itemsPerPage,
		currentPage: page,
		sortField,
		sortDirection
	} = getState().tasksNavigation

	try {
		// WORKAROUND TO KNOW HOW MANY ITEMS PER PAGE (NOT PROVIDED IN RESPONSE)
		// LOAD FIRST PAGE
		if (page !== 1 && !itemsPerPage) {
			const { data, status, statusText } = await getTasksPage({
				page: 1
			})
			if (status < 200 && status >= 300) {
				console.error('Request was failed with status:', statusText)
				throw new Error('Network error')
			}
			if (data.status === 'ok') {
				dispatch({
					type: SET_TASKS_NAVIGATION,
					payload: {
						itemsPerPage: data.message.tasks.length
					}
				})
			} else {
				console.error(data)
				dispatch({ type: FETCH_TASKS_FAILURE, payload: data.message })
			}
		}
		// LOAD PAGE
		const { data, status, statusText } = await getTasksPage({
			page,
			sortField,
			sortDirection
		})

		if (status < 200 && status >= 300) {
			console.error('Request was failed with status:', statusText)
			throw new Error('Network error')
		}

		if (data.status === 'ok') {
			const { tasks, total_task_count } = data.message
			dispatch({
				type: FETCH_TASKS_SUCCESS,
				payload: { items: tasks }
			})
			// Update tasks {total} quantity and {itemsPerPage}
			const navigationPayload = {
				total: parseInt(total_task_count, 10)
			}
			if (page === 1) {
				navigationPayload.itemsPerPage = tasks.length
			}
			dispatch({
				type: SET_TASKS_NAVIGATION,
				payload: navigationPayload
			})
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
