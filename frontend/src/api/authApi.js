import { apiFetch } from './apiClient.js'

const API_URL = '/api/auth'

export function registerUser(user) {
    return apiFetch(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
    })
}

export function loginUser(credentials) {
    return apiFetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
}