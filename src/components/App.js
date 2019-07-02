import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import TasksPage from './TasksPage'
import LoginPage from './LoginPage'
import './App.scss'

function App() {
	return (
		<div className="app">
			<Router>
				<Header />
				<Switch>
					<Route path="/" exact component={TasksPage} />
					<Route path="/login" exact component={LoginPage} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
