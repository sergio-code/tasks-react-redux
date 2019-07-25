import { SHOW_ERROR, REMOVE_ERROR } from './types'

export const addError = (payload) => {
	return {
		type: SHOW_ERROR,
		payload
	}
}

export const removeError = (payload) => {
	return {
		type: REMOVE_ERROR,
		payload
	}
}
