import { apiFetch } from './apiClient.js'

const API_URL = '/api/categories'

export function getCategories() {
    return apiFetch(API_URL)
}

export function createCategory(category) {
    return apiFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(category),
    })
}