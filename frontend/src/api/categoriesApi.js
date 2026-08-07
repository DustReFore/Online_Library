import { apiFetch } from './apiClient.js'

const API_URL = '/api/categories'

export function getCategories() {
    return apiFetch(API_URL)
}

export function getCategoryById(id) {
    return apiFetch(`${API_URL}/${id}`)
}

export function createCategory(category) {
    return apiFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(category),
    })
}

export function updateCategory(id, category) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(category),
    })
}

export function deleteCategory(id) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
}