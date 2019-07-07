import { SubmissionError } from 'redux-form'
import {
	SHOW_ERROR,
	CREATE_TASK_ACTION,
	CREATE_TASK_SUCCESS,
	CREATE_TASK_FAILURE
} from './types'
import { tasksFetch } from '.'

import { createTask as apiCreateTask } from '../apis'

export const taskCreate = (values, invokedByReduxForm = true) => async (
	dispatch
) => {
	dispatch({ type: CREATE_TASK_ACTION })
	try {
		const { data, status, statusText } = await apiCreateTask(values)

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
