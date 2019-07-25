import { SubmissionError } from 'redux-form'
import history from '../history'

import {
	SIGN_IN_ACTION,
	SIGN_IN_SUCCESS,
	SIGN_IN_FAILURE,
	SIGN_OUT,
	SHOW_ERROR
} from './types'

import { login } from '../apis'

export const signOut = () => {
	return {
		type: SIGN_OUT
	}
}

export const signIn = (
	{ username, password },
	invokedByReduxForm = true
) => async (dispatch) => {
	dispatch({ type: SIGN_IN_ACTION })
	try {
		const { data, status, statusText } = await login({ username, password })

		// FAILURE
		if (status < 200 && status >= 300) {
			console.error('Request was failed with status:', statusText)
			throw new Error('Network error')
		}

		// SUCCESS
		if (data.status === 'ok') {
			dispatch({
				type: SIGN_IN_SUCCESS,
				payload: {
					username,
					token: data.message.token,
					dateOfIssue: new Date().getTime()
				}
			})
			history.push('/')
		} else {
			// FAILURE
			if (invokedByReduxForm && data && data.message) {
				throw new SubmissionError({
					...data.message,
					_error: 'SignIn failed!'
				})
			}
		}
	} catch (error) {
		console.log(error)

		dispatch({
			type: SIGN_IN_FAILURE,
			payload: { error: error.message }
		})

		// Pass redux-form error
		if (invokedByReduxForm) {
			if (error.name === SubmissionError.name) {
				throw error
			} else {
				throw new SubmissionError({
					_error: 'Error communicating with server. Try again later.'
				})
			}
		}

		// Or show in alert box
		dispatch({ type: SHOW_ERROR, payload: error.message })
	}
}
