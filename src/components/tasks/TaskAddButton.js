import React from 'react'
import { connect } from 'react-redux'
import TaskForm from './TaskForm'
import { showTaskForm, closeTaskForm } from '../../actions'

const TaskAddButton = ({
	showForm,
	// selectedTask,
	showTaskForm,
	closeTaskForm
}) => {
	return (
		<div>
			<button onClick={showTaskForm}>+ Add</button>
			<TaskForm isOpen={showForm} onClose={closeTaskForm} />
		</div>
	)
}

const mapStateToProps = (state) => {
	return { ...state.tasksForm }
}

export default connect(
	mapStateToProps,
	{ showTaskForm, closeTaskForm }
)(TaskAddButton)
