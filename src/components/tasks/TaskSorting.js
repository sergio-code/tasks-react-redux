import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSorting, setPage, fetchTasks } from '../../actions'

class TaskSorting extends Component {
	constructor(props) {
		super(props)
		this.state = {
			renderSubmitButton: false
		}
		this.formRef = React.createRef()
	}

	handleFormSubmit = (e) => {
		e.preventDefault()
		this.props.setSorting({
			field: e.target['field'].value,
			order: e.target['order'].value
		})
		this.setState({ renderSubmitButton: false })
		this.props.setPage(1)
		this.props.fetchTasks()
	}

	handleSelectChange = () => {
		const { field, order } = this.props
		const { field: fieldRef, order: orderRef } = this.formRef.current
		if (fieldRef.value === field && orderRef.value === order) {
			this.setState({ renderSubmitButton: false })
		} else {
			this.setState({ renderSubmitButton: true })
		}
	}

	render() {
		const { field, order } = this.props
		const { renderSubmitButton } = this.state
		return (
			<div className="tasks-sorting">
				<form onSubmit={this.handleFormSubmit} ref={this.formRef}>
					<label>
						Sort by{' '}
						<select
							name="field"
							defaultValue={field}
							onChange={this.handleSelectChange}
						>
							<option value="email">Email</option>
							{/* <option value="id">ID</option> */}
							<option value="username">Username</option>
							<option value="status">Status</option>
						</select>{' '}
					</label>{' '}
					<select
						name="order"
						defaultValue={order}
						onChange={this.handleSelectChange}
					>
						<option value="desc">Desc &darr;</option>
						<option value="asc">Asc &uarr;</option>
					</select>{' '}
					{renderSubmitButton && <button type="submit">Apply</button>}
				</form>
			</div>
		)
	}
}

const masStateToProps = (state) => {
	return { ...state.tasksNavigation.sorting }
}

export default connect(
	masStateToProps,
	{ setSorting, setPage, fetchTasks }
)(TaskSorting)
