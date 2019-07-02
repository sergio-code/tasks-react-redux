import React from 'react'

const TaskItem = ({ task, admin }) => {
	return (
		<article className="tasks-list-item">
			<div className="tasks-list-item-content">
				<label className={task.status === 10 ? 'line-through' : null}>
					<input
						type="checkbox"
						checked={task.status === 10 ? true : false}
						readOnly={!admin}
					/>
					{task.text}
				</label>
				{admin && <button>Edit</button>}
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
