import {
	SIGN_OUT,
	SET_TASKS_NAVIGATION,
	SET_CURRENT_OPERATION,
	SET_CURRENT_TASK,
	SHOW_ERROR,
	REMOVE_ERROR
} from './types'

export * from './fetchTasks'
export * from './createTask'
export * from './editTask'
export * from './signIn'

export const signOut = () => {
	return {
		type: SIGN_OUT
	}
}

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
