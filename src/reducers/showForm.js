import { SHOW_TASK_FORM, CLOSE_TASK_FORM } from '../actions/types'

export default (_, action) => {
	switch (action.type) {
		case SHOW_TASK_FORM:
			return true

		case CLOSE_TASK_FORM:
			return false

		default:
			return false
	}
}
