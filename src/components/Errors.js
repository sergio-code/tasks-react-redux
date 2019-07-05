import React from 'react'
import { connect } from 'react-redux'
import { removeError } from '../actions'

const Errors = ({ errors, removeError }) => {
	return (
		<div className="alert-area">
			{errors.map((error, index) => {
				return (
					<div className="alert-box" key={index}>
						<i
							className="alert-close"
							onClick={() => {
								removeError(index)
							}}
						/>
						<p className="alert-content">{error}</p>
					</div>
				)
			})}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		errors: state.errors
	}
}

export default connect(
	mapStateToProps,
	{ removeError }
)(Errors)
