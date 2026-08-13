import { apiFetch } from './apiClient.js'

const API_URL = '/api/reviews'

export function getReviewsByBook(bookId) {
    return apiFetch(`${API_URL}/book/${bookId}`)
}

export function createReview(review) {
    return apiFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(review),
    })
}

export function updateReview(id, review) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(review),
    })
}

export function deleteReview(id) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
}