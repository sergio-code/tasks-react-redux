import React from 'react'
import { Field, reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { mapValues, unescape } from 'lodash'
import { taskUpdate, setCurrentOperation } from '../actions'
import CoverAnimation from './CoverAnimation'
import { TASK_STATUS_COMPLETED } from '../configuration'

const FORM_NAME = 'taskUpdate'

const validate = (values) => {
	const errors = {}
	if (!values.text) {
		errors.text = 'Required'
	} else if (values.text.length < 10) {
		errors.text = 'Must be 10 characters or more'
	}
	return errors
}

const renderField = ({
	input,
	label,
	type,
	meta: { touched, error },
	disabled,
	placeholder: initPlaceholder
}) => {
	const id = `${FORM_NAME.toLowerCase()}-form-${input.name}`
	let placeholder = ''
	if (initPlaceholder) {
		placeholder = initPlaceholder
	} else if (label) {
		placeholder = `Type your ${label.toLowerCase()}`
	}
	return (
		<div className="form-group">
			{label && <label htmlFor={id}>{label}</label>}
			<div>
				<input
					{...input}
					id={id}
					placeholder={placeholder}
					type={type}
					disabled={disabled}
				/>
				{touched && error && <p className="help-block">{error}</p>}
			</div>
		</div>
	)
}

const TaskFormUpdate = ({
	taskUpdate,
	setCurrentOperation,
	error,
	handleSubmit,
	valid,
	taskRequestStatus
}) => {
	return (
		<CoverAnimation animate={taskRequestStatus.submitting}>
			<form className="form" onSubmit={handleSubmit(taskUpdate)}>
				<h2 className="form-title">Edit task</h2>
				<Field name="id" type="hidden" component="input" />
				<Field
					name="email"
					type="email"
					label="Email"
					component={renderField}
					disabled
				/>
				<Field
					name="username"
					type="text"
					label="Username"
					component={renderField}
					disabled
				/>
				<Field
					name="text"
					type="text"
					label="Text"
					component={renderField}
				/>
				<Field
					name="status"
					type="checkbox"
					label="Done"
					component={renderField}
				/>
				<div className="form-group">
					{error && <strong>{error}</strong>}
				</div>
				<div className="actions">
					<button
						onClick={(e) => {
							e.preventDefault()
							setCurrentOperation(null)
						}}
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={!valid || taskRequestStatus.submitting}
					>
						OK
					</button>
				</div>
			</form>
		</CoverAnimation>
	)
}

const formWrapped = reduxForm({
	form: FORM_NAME,
	enableReinitialize: true,
	validate,
	onSubmitSuccess: (_, dispatch) => {
		dispatch(reset(FORM_NAME))
		dispatch(setCurrentOperation(null))
	}
})(TaskFormUpdate)

const mapStateToProps = (state) => {
	const { taskCurrentId } = state.modal
	const taskRequestStatus = state.common.tasksUpdating[taskCurrentId] || {}
	const task = state.tasks.items[taskCurrentId] || {}
	const initialValues = {
		...mapValues(task, unescape),
		status: task.status === TASK_STATUS_COMPLETED ? true : false
	}
	return {
		initialValues,
		taskRequestStatus
	}
}

export default connect(
	mapStateToProps,
	{ taskUpdate, setCurrentOperation }
)(formWrapped)
