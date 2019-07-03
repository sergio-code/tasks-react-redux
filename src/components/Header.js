import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../actions'

const Header = ({ signOut, username, isLoggedIn }) => (
	<header className="header">
		<nav className="navbar" aria-label="Site navigation bar">
			<Link className="navbar-brand" to="/">
				Tasks
			</Link>
			<div className="navbar-login">
				{isLoggedIn ? (
					<span className="navbar-login-info">Hello, {username}</span>
				) : null}
				{isLoggedIn ? (
					<button onClick={signOut} className="navbar-login-button">
						SignOut
					</button>
				) : (
					<Link className="navbar-login-button" to="/login">
						SignIn
					</Link>
				)}
			</div>
		</nav>
	</header>
)

const mapStateToProps = (state) => {
	const { username, isLoggedIn } = state.auth
	return { username, isLoggedIn }
}

export default connect(
	mapStateToProps,
	{ signOut }
)(Header)
