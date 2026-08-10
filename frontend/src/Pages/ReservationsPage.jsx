import { useEffect, useState } from 'react'
import { cancelReservation, getReservationsByUser } from '../api/reservationsApi.js'

function ReservationsPage() {
    const [currentUser] = useState(() =>
        JSON.parse(localStorage.getItem('currentUser'))
    )

    const [reservations, setReservations] = useState([])

    useEffect(() => {
        if (!currentUser) {
            return
        }

        let cancelled = false

        getReservationsByUser(currentUser.id)
            .then((data) => {
                if (!cancelled) {
                    setReservations(data)
                }
            })
            .catch((error) => {
                console.error(
                    'Error loading reservations:',
                    error
                )
            })

        return () => {
            cancelled = true
        }
    }, [currentUser])

    async function handleCancel(id) {
        try {
            const updatedReservation =
                await cancelReservation(id)

            setReservations((currentReservations) =>
                currentReservations.map((reservation) =>
                    reservation.id === id
                        ? updatedReservation
                        : reservation
                )
            )
        } catch (error) {
            console.error('Error cancelling reservation:', error)
            alert('Reservation could not be cancelled.')
        }
    }

    if (!currentUser) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning">
                    Please log in to view reservations.
                </div>
            </div>
        )
    }

    return (
        <div className="container py-5">
            <h1 className="mb-4 text-black">My Reservations</h1>

            {reservations.length === 0 ? (
                <div className="alert alert-info">
                    You do not have any reservations.
                </div>
            ) : (
                <div className="row g-4">
                    {reservations.map((reservation) => (
                        <div
                            className="col-12 col-md-6"
                            key={reservation.id}
                        >
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5>{reservation.book?.title}</h5>

                                    <p>
                                        Reservation date:{' '}
                                        {reservation.reservationDate}
                                    </p>

                                    <span
                                        className={
                                            reservation.active
                                                ? 'badge text-bg-success'
                                                : 'badge text-bg-secondary'
                                        }
                                    >
                                        {reservation.active
                                            ? 'Active'
                                            : 'Cancelled'}
                                    </span>
                                </div>

                                {reservation.active && (
                                    <div className="card-footer">
                                        <button
                                            className="btn btn-danger w-100"
                                            onClick={() =>
                                                handleCancel(reservation.id)
                                            }
                                        >
                                            Cancel reservation
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ReservationsPage