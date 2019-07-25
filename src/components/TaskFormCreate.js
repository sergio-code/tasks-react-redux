import React from 'react'
import { Field, reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { taskCreate, setCurrentOperation } from '../actions'
import CoverAnimation from './CoverAnimation'

const FORM_NAME = 'taskCreate'

const validate = (values) => {
	const errors = {}
	if (!values.text) {
		errors.text = 'Required'
	} else if (values.text.length < 10) {
		errors.text = 'Must be 10 characters or more'
	}
	if (!values.username) {
		errors.username = 'Required'
	} else if (values.username.length > 20) {
		errors.username = 'Must be 20 characters or less'
	}
	if (!values.email) {
		errors.email = 'Required'
	} else if (
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
	) {
		errors.email = 'Invalid email address'
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

const TaskFormCreate = ({
	error,
	handleSubmit,
	setCurrentOperation,
	valid,
	taskSubmitting,
	reset,
	taskCreate
}) => {
	return (
		<CoverAnimation animate={taskSubmitting}>
			<form className="form" onSubmit={handleSubmit(taskCreate)}>
				<h2 className="form-title">Create task</h2>
				<Field
					name="email"
					type="email"
					label="Email"
					component={renderField}
				/>
				<Field
					name="username"
					type="text"
					label="Username"
					component={renderField}
				/>
				<Field
					name="text"
					type="text"
					label="Text"
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
					<button onClick={reset}>Reset</button>
					<button type="submit" disabled={!valid || taskSubmitting}>
						OK
					</button>
				</div>
			</form>
		</CoverAnimation>
	)
}

const formWrapped = reduxForm({
	form: FORM_NAME,
	validate,
	onSubmitSuccess: (_, dispatch) => {
		dispatch(reset(FORM_NAME))
		dispatch(setCurrentOperation(null))
	}
})(TaskFormCreate)

const mapStateToProps = (state) => {
	return {
		taskSubmitting: state.taskCreation.submitting
	}
}

export default connect(
	mapStateToProps,
	{ taskCreate, setCurrentOperation }
)(formWrapped)
