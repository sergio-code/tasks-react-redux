import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ isOpen, onClose, children }) => {
	return isOpen
		? ReactDOM.createPortal(
				<div className="modal-container" onClick={onClose}>
					<div
						className="modal-container-content"
						onClick={(e) => e.stopPropagation()}
					>
						{children}
					</div>
				</div>,
				document.getElementById('modal')
		  )
		: null
}

export default Modal
