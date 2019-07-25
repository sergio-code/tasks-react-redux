import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../actions'

const renderButton = ({ isLoggedIn, signOut, location }) => {
	if (isLoggedIn) {
		return (
			<button onClick={signOut} className="navbar-login-button">
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

const Header = ({ signOut, username, isLoggedIn, location }) => {
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
					{renderButton({ isLoggedIn, signOut, location })}
				</div>
			</nav>
		</header>
	)
}

const mapStateToProps = (state) => {
	const { username, isLoggedIn } = state.login
	return { username, isLoggedIn }
}

export default withRouter(
	connect(
		mapStateToProps,
		{ signOut }
	)(Header)
)
