import React from 'react'
import { connect } from 'react-redux'
import Pagination from './Pagination'
import { TaskList, TaskSorting, TaskAddButton } from './tasks'
import { setPage, fetchTasks } from '../actions'

const TasksPage = ({ total, itemsPerPage, currentPage, onPageSelect }) => {
	return (
		<React.Fragment>
			<section title="Tasks" className="tasks">
				<div className="container">
					<div className="flex space-between">
						<TaskSorting />
						<TaskAddButton />
					</div>
					<TaskList />
					<Pagination
						{...{ total, itemsPerPage, currentPage, onPageSelect, length: 7 }}
					/>
				</div>
			</section>
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
	return {
		total: state.tasks.total,
		itemsPerPage: state.tasksNavigation.perPage,
		currentPage: state.tasksNavigation.page
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onPageSelect: (num) => {
			dispatch(setPage(num))
			dispatch(fetchTasks())
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TasksPage)
