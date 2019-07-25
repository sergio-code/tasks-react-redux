import { omit } from 'lodash'
import { SubmissionError } from 'redux-form'
import {
	SHOW_ERROR,
	SET_TASKS_NAVIGATION,
	FETCH_TASKS_DATA,
	FETCH_TASKS_SUCCESS,
	FETCH_TASKS_FAILURE,
	CREATE_TASK,
	CREATE_TASK_SUCCESS,
	CREATE_TASK_FAILURE,
	EDIT_TASK,
	EDIT_TASK_SUCCESS,
	EDIT_TASK_FAILURE
} from './types'
import {
	TASK_STATUS_COMPLETED,
	TASK_STATUS_NOT_COMPLETED
} from '../configuration'

import history from '../history'
import * as client from '../apis'

import { getTasksPage } from '../apis'

export const taskCreate = (values, invokedByReduxForm = true) => async (
	dispatch
) => {
	dispatch({ type: CREATE_TASK })
	try {
		const { data, status, statusText } = await client.createTask(values)

		if (status < 200 && status >= 300) {
			console.error('Request was failed with status:', statusText)
			throw new Error('Network error')
		}

		if (data.status === 'ok') {
			dispatch({ type: CREATE_TASK_SUCCESS })
			// Fetch tasks updates
			dispatch(tasksFetch())
		} else {
			if (invokedByReduxForm && data && data.message) {
				throw new SubmissionError({
					...data.message,
					_error: 'Operation is failed!'
				})
			}
		}
	} catch (error) {
		console.error(error)

		dispatch({ type: CREATE_TASK_FAILURE, payload: error })

		// Pass redux-form error
		if (invokedByReduxForm) {
			// https://github.com/erikras/redux-form/issues/4302
			if (error.name === SubmissionError.name) {
				throw error
			} else {
				throw new SubmissionError({
					_error: 'Error communicating with server. Try again later.'
				})
			}
		}

		// Show other errors
		dispatch({ type: SHOW_ERROR, payload: error.message })
	}
}

// FETCH_TASKS
export const tasksFetch = () => async (dispatch, getState) => {
	dispatch({ type: FETCH_TASKS_DATA })

	const {
		itemsPerPage,
		currentPage: page,
		sortField,
		sortDirection
	} = getState().navigation

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

export const taskUpdate = (values, invokedByReduxForm = true) => async (
	dispatch,
	getState
) => {
	// Prepare request payload
	const token = getState().login.token
	const payload = { token }
	if (values.text) {
		payload.text = values.text
	}
	if (values.status !== undefined) {
		if (
			[TASK_STATUS_COMPLETED, TASK_STATUS_NOT_COMPLETED].includes(
				values.status
			)
		) {
			payload.status = values.status
		} else {
			payload.status = values.status
				? TASK_STATUS_COMPLETED
				: TASK_STATUS_NOT_COMPLETED
		}
	}
	dispatch({ type: EDIT_TASK, payload: { id: values.id } })
	try {
		const { data, status, statusText } = await client.editTask(
			values.id,
			payload
		)

		if (status < 200 && status >= 300) {
			console.error('Request was failed with status:', statusText)
			throw new Error('Network error')
		}

		if (data.status === 'ok') {
			dispatch({
				type: EDIT_TASK_SUCCESS,
				payload: {
					id: values.id,
					...omit(payload, ['token'])
				}
			})
		} else if (
			data.status === 'error' &&
			data.message &&
			data.message.token
		) {
			const error =
				'Authentication is expired or invalid. Please login again.'
			dispatch({
				type: EDIT_TASK_FAILURE,
				payload: {
					error,
					id: values.id
				}
			})
			dispatch({ type: SHOW_ERROR, payload: error })
			history.push('/login')
		} else {
			const error = 'Error: ' + JSON.stringify(data.message, null, ' ')
			dispatch({
				type: EDIT_TASK_FAILURE,
				payload: {
					error,
					id: values.id
				}
			})
			dispatch({ type: SHOW_ERROR, payload: error })
			if (invokedByReduxForm) {
				throw new SubmissionError({
					...data.message,
					_error: 'Task update is failed!'
				})
			}
		}
	} catch (error) {
		dispatch({ type: EDIT_TASK_FAILURE, payload: { error, id: values.id } })
		// Pass redux-form error
		// https://github.com/erikras/redux-form/issues/4302
		if (error.name === SubmissionError.name) {
			throw error
		}
		// Show non redux-form errors
		console.error(error)
		dispatch({ type: SHOW_ERROR, payload: error.message })
		if (invokedByReduxForm) {
			throw new SubmissionError({
				_error:
					'Edit task: Error communicating with server. See console for details.'
			})
		}
	}
}
