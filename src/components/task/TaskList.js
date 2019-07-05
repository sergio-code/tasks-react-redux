import React, { useEffect } from 'react'
import { connect } from 'react-redux'
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
	items,
	itemsUpdating,
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
			return <h3>Loading...</h3>
		}
		return Object.values(items).map((item) => {
			const updating = itemsUpdating[item.id] || {}
			return (
				<CoverAnimation animate={updating.submitting} key={item.id}>
					<TaskItem
						task={item}
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
		items: state.tasks.items,
		itemsUpdating: state.tasksUpdating,
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
