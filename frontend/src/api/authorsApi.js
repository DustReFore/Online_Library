import { apiFetch } from './apiClient.js'

const API_URL = '/api/authors'

export function getAuthors() {
    return apiFetch(API_URL)
}

export function getAuthorById(id) {
    return apiFetch(`${API_URL}/${id}`)
}

export function createAuthor(author) {
    return apiFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(author),
    })
}

export function updateAuthor(id, author) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(author),
    })
}

export function deleteAuthor(id) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
}