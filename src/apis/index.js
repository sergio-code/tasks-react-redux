import axios from 'axios'

const DEVELOPER_NAME = 'test'
const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2'

export function getTasksPage({
	page = 1,
	sortField = 'id',
	sortDirection = 'asc'
} = {}) {
	return axios({
		url: '/',
		baseURL: BASE_URL,
		method: 'GET',
		params: {
			page,
			sort_field: sortField,
			sort_direction: sortDirection,
			developer: DEVELOPER_NAME
		}
	})
}

export function login({ username, password }) {
	const data = new FormData()
	data.append('username', username)
	data.append('password', password)
	return axios({
		timeout: 30000,
		url: '/login',
		baseURL: BASE_URL,
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' },
		params: {
			developer: DEVELOPER_NAME
		},
		data
	})
}

export function createTask(values) {
	const data = new FormData()
	for (let field in values) {
		data.append(field, values[field])
	}

	return axios({
		timeout: 30000,
		url: '/create',
		baseURL: BASE_URL,
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' },
		params: {
			developer: DEVELOPER_NAME
		},
		data
	})
}

export function editTask(id, values) {
	const data = new FormData()
	for (let field in values) {
		data.append(field, values[field])
	}

	return axios({
		timeout: 30000,
		url: `/edit/${id}`,
		baseURL: BASE_URL,
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' },
		params: {
			developer: DEVELOPER_NAME
		},
		data
	})
}
