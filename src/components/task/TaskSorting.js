import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { setNavigation } from '../../actions'

const TaskSorting = ({ setNavigation, sortField, sortDirection }) => {
	const [showButton, setShowButton] = useState(false)
	const formRef = useRef(null)

	const handleFormSubmit = (e) => {
		e.preventDefault()
		setNavigation({
			sortField: e.target['sortField'].value,
			sortDirection: e.target['sortDirection'].value,
			currentPage: 1
		})
		setShowButton(false)
	}

	const handleSelectChange = () => {
		if (
			formRef.current.sortField.value === sortField &&
			formRef.current.sortDirection.value === sortDirection
		) {
			setShowButton(false)
		} else {
			setShowButton(true)
		}
	}

	return (
		<div className="tasks-sorting">
			<form onSubmit={handleFormSubmit} ref={formRef}>
				<label>
					Sort by{' '}
					<select
						name="sortField"
						defaultValue={sortField}
						onChange={handleSelectChange}
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
					onChange={handleSelectChange}
				>
					<option value="desc">Desc &darr;</option>
					<option value="asc">Asc &uarr;</option>
				</select>{' '}
				{showButton && <button type="submit">Apply</button>}
			</form>
		</div>
	)
}

const masStateToProps = (state) => {
	const { sortField, sortDirection } = state.tasksNavigation
	return { sortField, sortDirection }
}

export default connect(
	masStateToProps,
	{ setNavigation }
)(TaskSorting)
