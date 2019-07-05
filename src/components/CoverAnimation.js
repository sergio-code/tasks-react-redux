import React from 'react'
import '../styles/CoverAnimation.scss'

const CoverAnimation = ({ animate, children }) => {
	return (
		<div className="animation-container">
			{children}
			{animate && (
				<div className="animation-container-cover">
					<div className="animation-container-cover-loader__dual-ring" />
				</div>
			)}
		</div>
	)
}

export default CoverAnimation
