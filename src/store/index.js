import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from '../reducers'
import { loadFromLocalStorage, saveToLocalStorage } from './persistence'

const persistedState = loadFromLocalStorage()

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	reducers,
	persistedState,
	composeEnhancers(applyMiddleware(reduxThunk))
)

store.subscribe(() => {
	const { login, navigation } = store.getState()
	return saveToLocalStorage({ login, navigation })
})

export default store
