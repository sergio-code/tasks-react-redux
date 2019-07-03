import { SubmissionError } from 'redux-form'
import history from '../history'

import {
	SIGN_OUT,
	SIGN_IN_PROCESSING,
	SIGN_IN_SUCCESS,
	ADD_ERROR
} from '../actions/types'

import * as client from '../apis'

export const signOut = () => {
	return {
		type: SIGN_OUT
	}
}

export const signIn = ({ username, password }) => async (dispatch) => {
	dispatch({ type: SIGN_IN_PROCESSING })
	try {
		// LOAD PAGE
		const { data, status, statusText } = await client.login({
			username,
			password
		})

		if (status < 200 && status >= 300) {
			console.error('Request was failed with status:', statusText)
			throw new Error('Network error')
		}

		if (data.status === 'ok') {
			dispatch({
				type: SIGN_IN_SUCCESS,
				payload: {
					username,
					token: data.message.token
				}
			})
			history.push('/')
		} else {
			throw new SubmissionError({
				...data.message,
				_error: 'SignIn failed!'
			})
		}
	} catch (error) {
		// Pass redux-form error
		if (error.name === 'SubmissionError') {
			throw error
		}
		console.error(error)
		dispatch({ type: ADD_ERROR, payload: error })
		throw new SubmissionError({
			_error: 'Error communicating with server. See console for details.'
		})
	}
}
