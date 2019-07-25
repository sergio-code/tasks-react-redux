import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import errors from './errors'
import login from './login'
import tasks from './tasks'
import modal from './modal'
import navigation from './navigation'
import common from './common'


export default combineReducers({
	form,
	login,
	modal,
	errors,
	tasks,
	navigation,
	common
})
