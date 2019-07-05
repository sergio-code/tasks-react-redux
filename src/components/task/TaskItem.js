import React from 'react'

const TaskItem = ({ task, editable, onSelect, onToggle }) => {
	return (
		<article className="tasks-list-item">
			<div className="tasks-list-item-content">
				<label className={task.status === 10 ? 'line-through' : null}>
					<input
						type="checkbox"
						checked={task.status === 10 ? true : false}
						readOnly={!editable}
						disabled={!editable}
						onChange={(e) => onToggle(task.id, e.target.checked)}
					/>
					{task.text}
				</label>
				{editable && (
					<button onClick={() => onSelect(task.id)}>Edit</button>
				)}
			</div>
			<hr />
			<p className="tasks-list-item-info">
				<a href={`mailto:${task.email}`}>{task.email}</a> |{' '}
				{task.username}
			</p>
		</article>
	)
}

export default TaskItem
