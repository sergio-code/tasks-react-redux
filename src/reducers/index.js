import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import errors from './errors'
import tasks from './tasks'
import tasksPageNumber from './tasksPageNumber'
import tasksPerPage from './tasksPerPage'
import tasksSorting from './tasksSorting'
import selectedTask from './selectedTask'
import showForm from './showForm'

export default combineReducers({
	form,
	errors,
	tasks,
	tasksNavigation: combineReducers({
		page: tasksPageNumber,
		perPage: tasksPerPage,
		sorting: tasksSorting,
	}),
	tasksForm: combineReducers({
		showForm,
		selectedTask
	})
})
