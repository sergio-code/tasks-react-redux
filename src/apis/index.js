import axios from 'axios'

const DEVELOPER_NAME = 'test'
const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2'

export function get({ page = 1, field = 'id', order = 'asc' } = {}) {
	return axios({
		url: '/',
		baseURL: BASE_URL,
		method: 'GET',
		params: {
			page,
			sort_field: field,
			sort_direction: order,
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
