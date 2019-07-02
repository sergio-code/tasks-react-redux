import React from 'react'

const generateButtonsSequence = ({
	total,
	itemsPerPage,
	currentPage,
	length = 7
}) => {
	if (!total || !itemsPerPage || !currentPage) {
		return []
	}
	const buttons = []
	const lastPageNum = Math.ceil(total / itemsPerPage)
	if (currentPage > lastPageNum || currentPage < 1) {
		currentPage = 1
	}
	if (lastPageNum <= length) {
		for (let i = 1; i <= lastPageNum; i++) {
			buttons.push(i)
		}
	} else {
		// put first and last page
		buttons.push(1)
		buttons.push(lastPageNum)
		// push active page
		const activeButton = currentPage
		if (activeButton !== 1 && activeButton !== lastPageNum) {
			buttons.push(activeButton)
		}
		// push X surrounging buttons
		for (let i = 1; i <= length && buttons.length <= length; i++) {
			// put button on right of activeButton
			const right = activeButton + i
			if (right < lastPageNum && buttons.length < length) {
				buttons.push(right)
			}
			// put button on left of activeButton
			const left = activeButton - i
			if (left > 1 && buttons.length < length) {
				buttons.push(left)
			}
		}
	}
	return buttons.sort((a, b) => a - b)
}

const Pagination = ({ onPageSelect, total, itemsPerPage, currentPage, length = 7 }) => {
	const numbers = generateButtonsSequence({
		total,
		itemsPerPage,
		currentPage,
		length
	})
	const lastPageNum = Math.ceil(total / itemsPerPage)
	return (
		<nav aria-label="Pagination">
			<ul className="pagination">
				<li className="pagination-item">
				<button
						disabled={currentPage === 1}
						onClick={() => onPageSelect(currentPage - 1)}
					>
						Prev
					</button>
				</li>
				{numbers.map((num) => {
					return (
						<li className="pagination-item" key={num}>
							<button
								className={num === currentPage ? 'active' : ''}
								onClick={() => onPageSelect(num)}
							>
								{num}
							</button>
						</li>
					)
				})}
				<li className="pagination-item">
					<button
						disabled={currentPage === lastPageNum}
						onClick={() => onPageSelect(currentPage + 1)}
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination
