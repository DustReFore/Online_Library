import { useEffect, useState } from 'react'
import { getAllLoans, getLoansByUser, issueLoan, returnLoan } from '../api/loansApi.js'
import { getActiveReservations } from '../api/reservationsApi.js'

function LoansPage() {
    const [currentUser] = useState(() =>
        JSON.parse(localStorage.getItem('currentUser'))
    )

    const [loans, setLoans] = useState([])
    const [reservations, setReservations] = useState([])
    const [message, setMessage] = useState('')

    const isAdmin = currentUser?.role === 'ADMIN'

    useEffect(() => {
        if (!currentUser) {
            return
        }

        let cancelled = false

        if (isAdmin) {
            Promise.all([
                getAllLoans(),
                getActiveReservations(),
            ])
                .then(([loanData, reservationData]) => {
                    if (!cancelled) {
                        setLoans(loanData)
                        setReservations(reservationData)
                    }
                })
                .catch((error) => {
                    console.error('Error loading loans:', error)
                })
        } else {
            getLoansByUser(currentUser.id)
                .then((data) => {
                    if (!cancelled) {
                        setLoans(data)
                    }
                })
                .catch((error) => {
                    console.error('Error loading loans:', error)
                })
        }

        return () => {
            cancelled = true
        }
    }, [currentUser, isAdmin])

    async function handleIssue(reservationId) {
        setMessage('')

        try {
            const newLoan = await issueLoan(reservationId)

            setLoans((currentLoans) => [
                newLoan,
                ...currentLoans,
            ])

            setReservations((currentReservations) =>
                currentReservations.filter(
                    (reservation) =>
                        reservation.id !== reservationId
                )
            )

            setMessage('Book issued successfully.')
        } catch (error) {
            setMessage(error.message)
        }
    }

    async function handleReturn(loanId) {
        setMessage('')

        try {
            const updatedLoan = await returnLoan(loanId)

            setLoans((currentLoans) =>
                currentLoans.map((loan) =>
                    loan.id === loanId
                        ? updatedLoan
                        : loan
                )
            )

            setMessage('Book returned successfully.')
        } catch (error) {
            setMessage(error.message)
        }
    }

    if (!currentUser) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning">
                    Please log in to view loans.
                </div>
            </div>
        )
    }

    return (
        <main className="container py-5">
            <h1 className="mb-4 text-black">
                {isAdmin ? 'Loan Management' : 'My Loans'}
            </h1>

            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}

            {isAdmin && (
                <section className="mb-5">
                    <h2 className="mb-3 text-black">
                        Active reservations
                    </h2>

                    {reservations.length === 0 ? (
                        <div className="alert alert-secondary">
                            No active reservations.
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Book</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>

                                <tbody>
                                {reservations.map((reservation) => (
                                    <tr key={reservation.id}>
                                        <td>
                                            {reservation.user?.fullName}
                                        </td>
                                        <td>
                                            {reservation.book?.title}
                                        </td>
                                        <td>
                                            {reservation.reservationDate}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() =>
                                                    handleIssue(
                                                        reservation.id
                                                    )
                                                }
                                            >
                                                Issue book
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            )}

            <section>
                <h2 className="mb-3 text-black">
                    {isAdmin ? 'All loans' : 'Loan history'}
                </h2>

                {loans.length === 0 ? (
                    <div className="alert alert-secondary">
                        No loans found.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                {isAdmin && <th>User</th>}
                                <th>Book</th>
                                <th>Loan date</th>
                                <th>Due date</th>
                                <th>Status</th>
                                {isAdmin && <th>Action</th>}
                            </tr>
                            </thead>

                            <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id}>
                                    {isAdmin && (
                                        <td>
                                            {loan.user?.fullName}
                                        </td>
                                    )}

                                    <td>{loan.book?.title}</td>
                                    <td>{loan.loanDate}</td>
                                    <td>{loan.dueDate}</td>

                                    <td>
                                        {loan.returned
                                            ? `Returned ${loan.returnDate}`
                                            : 'Active'}
                                    </td>

                                    {isAdmin && (
                                        <td>
                                            {!loan.returned && (
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() =>
                                                        handleReturn(
                                                            loan.id
                                                        )
                                                    }
                                                >
                                                    Return book
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    )
}

export default LoansPage