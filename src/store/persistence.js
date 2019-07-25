import { LOCALSTORAGE_PERSIST_KEY } from '../configuration'

export function saveToLocalStorage(state) {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem(LOCALSTORAGE_PERSIST_KEY, serializedState)
	} catch (e) {
		console.log(e)
	}
}

export function loadFromLocalStorage() {
	try {
		const serializedState = localStorage.getItem(LOCALSTORAGE_PERSIST_KEY)
		if (serializedState === null) return undefined
		return JSON.parse(serializedState)
	} catch (e) {
		console.log(e)
		return undefined
	}
}
