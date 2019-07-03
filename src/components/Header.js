import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../actions'

const renderButton = ({ isLoggedIn, signOut, location }) => {
	console.log(location)
	if (location.pathname === '/login') {
		return null
	}
	if (isLoggedIn) {
		return (
			<button onClick={signOut} className="navbar-login-button">
				SignOut
			</button>
		)
	}
	if (!isLoggedIn) {
		return (
			<Link className="navbar-login-button" to="/login">
				SignIn
			</Link>
		)
	}
}

const Header = (props) => {
	console.log(props)
	const { signOut, username, isLoggedIn, location } = props
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
	const { username, isLoggedIn } = state.auth
	return { username, isLoggedIn }
}

export default withRouter(
	connect(
		mapStateToProps,
		{ signOut }
	)(Header)
)
