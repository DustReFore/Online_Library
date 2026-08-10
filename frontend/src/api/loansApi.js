import { apiFetch } from './apiClient.js'

const API_URL = '/api/loans'

export function getAllLoans() {
    return apiFetch(API_URL)
}

export function getLoansByUser(userId) {
    return apiFetch(`${API_URL}/user/${userId}`)
}

export function issueLoan(reservationId) {
    return apiFetch(
        `${API_URL}/reservation/${reservationId}`,
        {
            method: 'POST',
        }
    )
}

export function returnLoan(id) {
    return apiFetch(`${API_URL}/${id}/return`, {
        method: 'PATCH',
    })
}