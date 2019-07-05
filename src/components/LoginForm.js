import React from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { signIn } from '../actions'
import CoverAnimation from './CoverAnimation'

const FORM_NAME = 'loginForm'

const validate = (values) => {
	const errors = {}
	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length < 3) {
		errors.password = 'Must be 3 characters or more'
	}
	if (!values.username) {
		errors.username = 'Required'
	}
	return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
	<div className="form-group">
		{label && (
			<label htmlFor={`${FORM_NAME.toLowerCase()}-form-${input.name}`}>
				{label}
			</label>
		)}
		<div>
			<input
				{...input}
				id={`${FORM_NAME.toLowerCase()}-form-${input.name}`}
				placeholder={`Type your ${label.toLowerCase()}`}
				type={type}
			/>
			{touched && error && <p className="help-block">{error}</p>}
		</div>
	</div>
)

const LoginForm = ({ error, handleSubmit, loginSubmitting, signIn, valid }) => {
	return (
		<CoverAnimation animate={loginSubmitting}>
			<form
				className="form"
				onSubmit={handleSubmit(signIn)}
				style={{ position: 'relative' }}
			>
				<h2 className="form-title">Sign In</h2>
				<Field
					name="username"
					type="text"
					label="Username"
					component={renderField}
				/>
				<Field
					name="password"
					type="password"
					label="Password"
					component={renderField}
				/>
				<div className="form-group">
					{error && <strong>{error}</strong>}
				</div>
				<div className="actions">
					<button type="submit" disabled={!valid || loginSubmitting}>
						SignIn
					</button>
				</div>
				<p>
					<Link to="/">Go to main page</Link>
				</p>
			</form>
		</CoverAnimation>
	)
}

const formWrapped = reduxForm({
	form: FORM_NAME,
	validate,
	onSubmitSuccess: (_, dispatch) => dispatch(reset(FORM_NAME))
})(LoginForm)

const mapStateToProps = (state) => {
	return { loginSubmitting: state.auth.submitting }
}

export default connect(
	mapStateToProps,
	{ signIn }
)(formWrapped)
