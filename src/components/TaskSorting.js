import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNavigation } from '../actions'

const TaskSorting = () => {
	const dispatch = useDispatch()
	const { sortField, sortDirection } = useSelector((state) => {
		return { ...state.navigation }
	})
	const [field, setField] = useState(sortField)
	const [direction, setDirection] = useState(sortDirection)

	const handleFormSubmit = (e) => {
		e.preventDefault()
		dispatch(
			setNavigation({
				sortField: field,
				sortDirection: direction,
				currentPage: 1
			})
		)
	}

	return (
		<div className="tasks-sorting">
			<form onSubmit={handleFormSubmit}>
				<label>
					Sort by{' '}
					<select
						name="sortField"
						defaultValue={sortField}
						onChange={(e) => setField(e.target.value)}
					>
						<option value="email">Email</option>
						{/* <option value="id">ID</option> */}
						<option value="username">Username</option>
						<option value="status">Status</option>
					</select>{' '}
				</label>{' '}
				<select
					name="sortDirection"
					defaultValue={sortDirection}
					onChange={(e) => setDirection(e.target.value)}
				>
					<option value="desc">Desc &darr;</option>
					<option value="asc">Asc &uarr;</option>
				</select>{' '}
				{!(field === sortField && direction === sortDirection) && (
					<button type="submit">Apply</button>
				)}
			</form>
		</div>
	)
}

export default TaskSorting
