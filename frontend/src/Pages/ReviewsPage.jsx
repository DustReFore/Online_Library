import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBookById } from '../api/booksApi.js'
import { createReview, deleteReview, getReviewsByBook, updateReview } from '../api/reviewsApi.js'

function ReviewsPage() {
    const { bookId } = useParams()

    const [currentUser] = useState(() =>
        JSON.parse(localStorage.getItem('currentUser'))
    )

    const [book, setBook] = useState(null)
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')

    const isAdmin = currentUser?.role === 'ADMIN'

    const ownReview = reviews.find(
        (review) => review.user?.id === currentUser?.id
    )

    useEffect(() => {
        let cancelled = false

        Promise.all([
            getBookById(bookId),
            getReviewsByBook(bookId),
        ])
            .then(([bookData, reviewData]) => {
                if (!cancelled) {
                    setBook(bookData)
                    setReviews(reviewData)
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    setMessage(error.message)
                }
            })

        return () => {
            cancelled = true
        }
    }, [bookId])

    function handleEditOwnReview() {
        if (!ownReview) {
            return
        }

        setRating(ownReview.rating)
        setComment(ownReview.comment)
        setMessage('')
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setMessage('')

        if (!currentUser) {
            setMessage('Please log in to write a review.')
            return
        }

        try {
            if (ownReview) {
                const updatedReview = await updateReview(
                    ownReview.id,
                    {
                        userId: currentUser.id,
                        rating: Number(rating),
                        comment,
                    }
                )

                setReviews((currentReviews) =>
                    currentReviews.map((review) =>
                        review.id === updatedReview.id
                            ? updatedReview
                            : review
                    )
                )

                setMessage('Review updated successfully.')
            } else {
                const newReview = await createReview({
                    userId: currentUser.id,
                    bookId: Number(bookId),
                    rating: Number(rating),
                    comment,
                })

                setReviews((currentReviews) => [
                    newReview,
                    ...currentReviews,
                ])

                setMessage('Review added successfully.')
            }

            setRating(5)
            setComment('')
        } catch (error) {
            setMessage(error.message)
        }
    }

    async function handleDelete(reviewId) {
        const confirmed = window.confirm(
            'Are you sure you want to delete this review?'
        )

        if (!confirmed) {
            return
        }

        try {
            await deleteReview(reviewId)

            setReviews((currentReviews) =>
                currentReviews.filter(
                    (review) => review.id !== reviewId
                )
            )

            setRating(5)
            setComment('')
            setMessage('Review deleted successfully.')
        } catch (error) {
            setMessage(error.message)
        }
    }

    const averageRating = reviews.length === 0
        ? 0
        : reviews.reduce(
        (sum, review) => sum + review.rating,
        0
    ) / reviews.length

    return (
        <main className="container py-5">
            <Link to="/" className="btn btn-outline-secondary mb-4">
                Back to books
            </Link>

            <h1 className="text-black">
                Reviews: {book?.title}
            </h1>

            <p className="mb-4">
                Average rating:{' '}
                <strong>
                    {averageRating.toFixed(1)} / 5
                </strong>
            </p>

            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}

            {currentUser ? (
                <form
                    className="card p-4 shadow-sm mb-5"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-black">
                        {ownReview
                            ? 'Edit your review'
                            : 'Write a review'}
                    </h2>

                    {ownReview && comment === '' && (
                        <button
                            type="button"
                            className="btn btn-outline-primary mb-3"
                            onClick={handleEditOwnReview}
                        >
                            Load my review for editing
                        </button>
                    )}

                    <div className="mb-3">
                        <label className="form-label">
                            Rating
                        </label>

                        <select
                            className="form-select"
                            value={rating}
                            onChange={(event) =>
                                setRating(event.target.value)
                            }
                        >
                            <option value="5">5 – Excellent</option>
                            <option value="4">4 – Very good</option>
                            <option value="3">3 – Good</option>
                            <option value="2">2 – Poor</option>
                            <option value="1">1 – Very poor</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Comment
                        </label>

                        <textarea
                            className="form-control"
                            value={comment}
                            onChange={(event) =>
                                setComment(event.target.value)
                            }
                            maxLength={255}
                            rows={4}
                            required
                        />
                    </div>

                    <button className="btn btn-primary">
                        {ownReview
                            ? 'Update review'
                            : 'Add review'}
                    </button>
                </form>
            ) : (
                <div className="alert alert-warning">
                    Please log in to write a review.
                </div>
            )}

            <h2 className="mb-3 text-black">User reviews</h2>

            {reviews.length === 0 ? (
                <div className="alert alert-secondary">
                    No reviews for this book.
                </div>
            ) : (
                <div className="row g-4">
                    {reviews.map((review) => {
                        const canDelete =
                            isAdmin ||
                            review.user?.id === currentUser?.id

                        return (
                            <div
                                className="col-12"
                                key={review.id}
                            >
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h5>
                                                {review.user?.fullName}
                                            </h5>

                                            <span className="badge text-bg-warning">
                                                {review.rating} / 5
                                            </span>
                                        </div>

                                        <p className="mb-2">
                                            {review.comment}
                                        </p>

                                        <small className="text-muted">
                                            {review.reviewDate}
                                        </small>
                                    </div>

                                    {canDelete && (
                                        <div className="card-footer">
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(review.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </main>
    )
}

export default ReviewsPage