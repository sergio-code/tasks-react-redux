import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTasks } from '../../actions'
import TaskItem from './TaskItem'

class TaskList extends Component {
	componentDidMount() {
		this.props.fetchTasks()
	}

	renderList() {
		if (this.props.loading) {
			return <h3>Loading...</h3>
		}
		return this.props.items.map((task) => {
			return <TaskItem task={task} key={task.id} />
		})
	}

	render() {
		return <div className="tasks-list">{this.renderList()}</div>
	}
}

const masStateToProps = (state) => {
	return {
		items: Object.values(state.tasks.items),
		loading: state.tasks.loading
	}
}

export default connect(
	masStateToProps,
	{ fetchTasks }
)(TaskList)
