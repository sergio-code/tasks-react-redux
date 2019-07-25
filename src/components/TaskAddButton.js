import React from 'react'
import { connect } from 'react-redux'
import { setCurrentOperation } from '../actions'
import { CREATE_OPERATION } from '../configuration'

const TaskAddButton = ({ setCurrentOperation }) => {
	return (
		<div>
			<button onClick={() => setCurrentOperation(CREATE_OPERATION)}>
				+ Add
			</button>
		</div>
	)
}

export default connect(
	null,
	{ setCurrentOperation }
)(TaskAddButton)
