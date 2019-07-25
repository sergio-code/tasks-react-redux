import React from 'react'
import { unescape } from 'lodash'
import { TASK_STATUS_COMPLETED } from '../configuration'

const TaskItem = ({ task, editable, onSelect, onToggle }) => {
	return (
		<article className="tasks-list-item">
			<div className="tasks-list-item-content">
				<label
					className={
						task.status === TASK_STATUS_COMPLETED
							? 'line-through'
							: null
					}
				>
					<input
						type="checkbox"
						checked={
							task.status === TASK_STATUS_COMPLETED ? true : false
						}
						readOnly={!editable}
						disabled={!editable}
						onChange={(e) => onToggle(task.id, e.target.checked)}
					/>
					{unescape(task.text)}
				</label>
				{editable && (
					<button onClick={() => onSelect(task.id)}>Edit</button>
				)}
			</div>
			<hr />
			<p className="tasks-list-item-info">
				<a href={`mailto:${task.email}`}>{task.email}</a> |{' '}
				{unescape(task.username)}
			</p>
		</article>
	)
}

export default TaskItem
