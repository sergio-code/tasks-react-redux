import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { orderBy } from 'lodash'
import {
	tasksFetch,
	taskUpdate,
	setCurrentTask,
	setCurrentOperation
} from '../actions'
import TaskItem from './TaskItem'
import CoverAnimation from './CoverAnimation'
import {
	EDIT_OPERATION,
	TASK_STATUS_COMPLETED,
	TASK_STATUS_NOT_COMPLETED
} from '../configuration'

const TaskList = ({
	tasksFetch,
	setCurrentTask,
	setCurrentOperation,
	taskUpdate,
	loading,
	tasks,
	tasksUpdating,
	taskOperation,
	currentPage,
	sortField,
	sortDirection,
	isLoggedIn
}) => {
	useEffect(() => {
		tasksFetch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, sortField, sortDirection])

	const handleSelect = (id) => {
		setCurrentTask(id)
		setCurrentOperation(EDIT_OPERATION)
	}

	const handleToggle = (id, statusValue) => {
		const status = statusValue
			? TASK_STATUS_COMPLETED
			: TASK_STATUS_NOT_COMPLETED
		taskUpdate({ id, status }, false)
	}

	const renderList = () => {
		if (loading) {
			return (
				<CoverAnimation animate>
					<div style={{ height: '18em' }} />
				</CoverAnimation>
			)
		}

		return orderBy(tasks, sortField, sortDirection).map((task) => {
			const taskRequest = tasksUpdating[task.id] || {}
			return (
				<CoverAnimation
					animate={
						taskOperation !== EDIT_OPERATION &&
						taskRequest.submitting
					}
					key={task.id}
				>
					<TaskItem
						task={task}
						editable={isLoggedIn}
						onSelect={handleSelect}
						onToggle={handleToggle}
					/>
				</CoverAnimation>
			)
		})
	}

	return <div className="tasks-list">{renderList()}</div>
}

const mapStateToProps = (state) => {
	const { currentPage, sortField, sortDirection } = state.navigation
	return {
		loading: state.tasks.loading,
		tasks: state.tasks.items,
		taskOperation: state.modal.taskOperation,
		tasksUpdating: state.common.tasksUpdating,
		currentPage,
		sortField,
		sortDirection,
		isLoggedIn: state.login.isLoggedIn
	}
}

export default connect(
	mapStateToProps,
	{ tasksFetch, setCurrentTask, taskUpdate, setCurrentOperation }
)(TaskList)
