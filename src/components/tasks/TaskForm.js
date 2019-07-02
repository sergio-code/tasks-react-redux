import React from 'react'
import Modal from '../Modal'

const TaskForm = ({ isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div>FormIn Modal</div>
		</Modal>
	)
}

export default TaskForm
