import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
	<header className="header">
		<div className="container">
			<nav className="navbar" aria-label="Site navigation bar">
				<Link className="navbar-brand" to="/">
					Tasks
				</Link>
				<div className="navbar-login">
					<span className="navbar-login-info">
						You SignedIn as admin
					</span>
					<Link className="navbar-login-button" to="/login">
						SignOut
					</Link>
				</div>
			</nav>
		</div>
	</header>
)

export default Header
