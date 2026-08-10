export async function apiFetch(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => null)

        throw new Error(
            errorData?.detail ||
            errorData?.message ||
            `API error: ${response.status}`
        )
    }

    if (response.status === 204) {
        return null
    }

    return response.json()
}