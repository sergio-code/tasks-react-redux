import { omit } from 'lodash'
import { SubmissionError } from 'redux-form'
import {
	SHOW_ERROR,
	EDIT_TASK_ACTION,
	EDIT_TASK_SUCCESS,
	EDIT_TASK_FAILURE
} from './types'
import history from '../history'
import * as client from '../apis'

export const taskUpdate = (values, invokedByReduxForm = true) => async (
	dispatch,
	getState
) => {
	// Prepare request payload
	const token = getState().auth.token
	const payload = { token }
	if (values.text) {
		payload.text = values.text
	}
	if (values.status !== undefined) {
		if ([10, 0].includes(values.status)) {
			payload.status = values.status
		} else {
			payload.status = values.status ? 10 : 0
		}
	}
	dispatch({ type: EDIT_TASK_ACTION, payload: { id: values.id } })
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
