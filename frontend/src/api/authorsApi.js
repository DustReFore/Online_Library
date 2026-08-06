import { apiFetch } from './apiClient.js'

const API_URL = '/api/authors'

export function getAuthors() {
    return apiFetch(API_URL)
}

export function createAuthor(author) {
    return apiFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(author),
    })
}