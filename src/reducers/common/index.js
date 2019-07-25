import { combineReducers } from 'redux'
import taskCreation from './taskCreation'
import tasksUpdating from './tasksUpdating'

export default combineReducers({
	taskCreation,
	tasksUpdating
})
