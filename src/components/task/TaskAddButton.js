import React from 'react'
import { connect } from 'react-redux'
import { setCurrentOperation } from '../../actions'

const TaskAddButton = ({ setCurrentOperation }) => {
	return (
		<div>
			<button onClick={() => setCurrentOperation('create')}>+ Add</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return { ...state.tasksForm }
}

export default connect(
	mapStateToProps,
	{ setCurrentOperation }
)(TaskAddButton)
