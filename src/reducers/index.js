import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import errors from './errors'
import auth from './auth'
import tasks from './tasks'
import tasksNavigation from './tasksNavigation'
import taskCreation from './taskCreation'
import taskUpdating from './taskUpdating'
import taskOperation from './taskOperation'
import taskCurrentId from './taskCurrentId'

export default combineReducers({
	form,
	auth,
	errors,
	tasks,
	tasksNavigation,
	taskCreation,
	taskUpdating,
	taskOperation,
	taskCurrentId
})
