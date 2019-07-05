import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
	fetchTasks,
	setCurrentTask,
	editTask,
	setCurrentOperation
} from '../../actions'
import TaskItem from './TaskItem'
import CoverAnimation from '../CoverAnimation'

const TaskList = ({
	fetchTasks,
	setCurrentTask,
	setCurrentOperation,
	editTask,
	loading,
	items,
	currentPage,
	sortField,
	sortDirection,
	isLoggedIn
}) => {
	useEffect(() => {
		fetchTasks()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, sortField, sortDirection])

	const handleSelect = (id) => {
		setCurrentTask(id)
		setCurrentOperation('edit')
	}

	const handleToggle = (id, statusBool) => {
		const status = statusBool ? 10 : 0
		editTask({ id, status }, false)
	}

	const renderList = () => {
		if (loading) {
			return <h3>Loading...</h3>
		}
		return Object.values(items).map((task) => {
			return (
				<CoverAnimation animate={true}>
					<TaskItem
						task={task}
						editable={isLoggedIn}
						onSelect={handleSelect}
						onToggle={handleToggle}
						key={task.id}
					/>
				</CoverAnimation>
			)
		})
	}

	return <div className="tasks-list">{renderList()}</div>
}

const masStateToProps = (state) => {
	const { currentPage, sortField, sortDirection } = state.tasksNavigation
	return {
		loading: state.tasks.loading,
		items: state.tasks.items,
		currentPage,
		sortField,
		sortDirection,
		isLoggedIn: state.auth.isLoggedIn
	}
}

export default connect(
	masStateToProps,
	{ fetchTasks, setCurrentTask, editTask, setCurrentOperation }
)(TaskList)
