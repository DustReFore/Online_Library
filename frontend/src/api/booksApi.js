import { apiFetch } from './apiClient.js'

const API_URL = '/api/books'

export function getBooks() {
    return apiFetch(API_URL)
}

export function getBookById(id) {
    return apiFetch(`${API_URL}/${id}`)
}

export function createBook(book) {
    return apiFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(book),
    })
}

export function updateBook(id, book) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(book),
    })
}

export function deleteBook(id) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
}