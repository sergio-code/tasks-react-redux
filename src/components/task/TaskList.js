import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { orderBy } from 'lodash'
import {
	tasksFetch,
	taskUpdate,
	setCurrentTask,
	setCurrentOperation
} from '../../actions'
import TaskItem from './TaskItem'
import CoverAnimation from '../CoverAnimation'

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
		setCurrentOperation('edit')
	}

	const handleToggle = (id, statusBool) => {
		const status = statusBool ? 10 : 0
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
					animate={taskOperation !== 'edit' && taskRequest.submitting}
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

const masStateToProps = (state) => {
	const { currentPage, sortField, sortDirection } = state.tasksNavigation
	return {
		loading: state.tasks.loading,
		tasks: state.tasks.items,
		taskOperation: state.taskOperation,
		tasksUpdating: state.tasksUpdating,
		currentPage,
		sortField,
		sortDirection,
		isLoggedIn: state.auth.isLoggedIn
	}
}

export default connect(
	masStateToProps,
	{ tasksFetch, setCurrentTask, taskUpdate, setCurrentOperation }
)(TaskList)
