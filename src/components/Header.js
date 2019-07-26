import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../actions'

const renderButton = ({ isLoggedIn, onSignOut, location }) => {
	if (isLoggedIn) {
		return (
			<button onClick={onSignOut} className="navbar-login-button">
				SignOut
			</button>
		)
	}
	if (!isLoggedIn && location.pathname !== '/login') {
		return (
			<Link className="navbar-login-button" to="/login">
				SignIn
			</Link>
		)
	}
}

const Header = withRouter(({ location }) => {
	const dispatch = useDispatch()
	const onSignOut = () => dispatch(signOut())

	const { username, isLoggedIn } = useSelector((state) => {
		const { username, isLoggedIn } = state.login
		return { username, isLoggedIn }
	})

	return (
		<header className="header">
			<nav className="navbar" aria-label="Site navigation bar">
				<Link className="navbar-brand" to="/">
					Tasks
				</Link>
				<div className="navbar-login">
					{isLoggedIn ? (
						<span className="navbar-login-info">
							Hello, {username}
						</span>
					) : null}
					{renderButton({
						isLoggedIn,
						onSignOut,
						location
					})}
				</div>
			</nav>
		</header>
	)
})

export default Header
