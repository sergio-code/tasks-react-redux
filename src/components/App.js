import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import MainPage from './MainPage'
import LoginPage from './LoginPage'
import Errors from './Errors'
import '../styles/App.scss'
import history from '../history'

function App() {
	return (
		<div className="app">
			<Router history={history}>
				<Header />
				<Switch>
					<Route path="/" exact component={MainPage} />
					<Route path="/login" exact component={LoginPage} />
				</Switch>
			</Router>
			<Errors />
		</div>
	)
}

export default App
