import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ show, close, children }) => {
	return show
		? ReactDOM.createPortal(
				<div className="modal-container" onClick={close}>
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
