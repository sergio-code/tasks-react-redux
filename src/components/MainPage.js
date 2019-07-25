import React from 'react'
import { connect } from 'react-redux'
import TaskList from './TaskList'
import TaskSorting from './TaskSorting'
import TaskAddButton from './TaskAddButton'
import TaskFormCreate from './TaskFormCreate'
import TaskFormUpdate from './TaskFormUpdate'
import Pagination from './Pagination'
import Modal from './Modal'
import { setNavigation, setCurrentOperation } from '../actions'

const TasksPage = ({
	total,
	itemsPerPage,
	currentPage,
	setNavigation,
	taskOperation,
	setCurrentOperation
}) => {
	const onPageSelect = (currentPage) => setNavigation({ currentPage })
	return (
		<section title="Tasks" className="tasks">
			<div className="container">
				<Modal
					show={taskOperation !== null}
					close={() => setCurrentOperation(null)}
				>
					{taskOperation === 'create' && <TaskFormCreate />}
					{taskOperation === 'edit' && <TaskFormUpdate />}
				</Modal>
				<div className="flex space-between">
					<TaskSorting />
					<TaskAddButton />
				</div>
				<TaskList />
				<Pagination
					{...{
						total,
						itemsPerPage,
						currentPage,
						onPageSelect,
						length: 7
					}}
				/>
			</div>
		</section>
	)
}

const mapStateToProps = (state) => {
	const {
		tasksNavigation: { currentPage, itemsPerPage, total },
		taskOperation
	} = state
	return {
		currentPage,
		itemsPerPage,
		total,
		taskOperation
	}
}

export default connect(
	mapStateToProps,
	{ setNavigation, setCurrentOperation }
)(TasksPage)
