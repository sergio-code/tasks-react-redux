import {
	SET_TASKS_NAVIGATION,
	SET_CURRENT_OPERATION,
	SET_CURRENT_TASK,
} from './types'

export const setNavigation = (payload) => {
	return {
		type: SET_TASKS_NAVIGATION,
		payload
	}
}

export const setCurrentOperation = (payload) => {
	return {
		type: SET_CURRENT_OPERATION,
		payload
	}
}

export const setCurrentTask = (payload) => {
	return {
		type: SET_CURRENT_TASK,
		payload
	}
}