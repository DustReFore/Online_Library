import { apiFetch } from './apiClient.js'

const API_URL = '/api/reservations'

export function getReservationsByUser(userId) {
    return apiFetch(`${API_URL}/user/${userId}`)
}

export function createReservation(userId, bookId) {
    return apiFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            userId,
            bookId,
        }),
    })
}

export function cancelReservation(id) {
    return apiFetch(`${API_URL}/${id}/cancel`, {
        method: 'PATCH',
    })
}