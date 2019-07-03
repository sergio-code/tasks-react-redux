import React from 'react'
import { Field, reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { signIn } from '../actions'

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
		{label && <label>{label}</label>}
		<div>
			<input
				{...input}
				placeholder={`Type your ${label.toLowerCase()}`}
				type={type}
			/>
			{touched && error && <p className="help-block">{error}</p>}
		</div>
	</div>
)

const LoginPage = ({ error, handleSubmit, submitting, signIn }) => {
	return (
		<section>
			<div className="container">
				{submitting ? (
					<h3>Submitting...</h3>
				) : (
					<form
						className="form login"
						onSubmit={handleSubmit(signIn)}
					>
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
							<button type="submit">SignIn</button>
						</div>
					</form>
				)}
			</div>
		</section>
	)
}

const formWrapped = reduxForm({
	form: 'login',
	validate,
	onSubmitSuccess: (_, dispatch) => dispatch(reset('login'))
})(LoginPage)

const mapStateToProps = (state) => {
	const { submitting } = state.auth
	return { submitting }
}

export default connect(
	mapStateToProps,
	{ signIn }
)(formWrapped)
