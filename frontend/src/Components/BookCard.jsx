import { Link } from 'react-router-dom'

function BookCard({ book, onDelete }) {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>

                <p className="card-text mb-1">
                    <strong>Author:</strong>{' '}
                    {book.author?.firstName} {book.author?.lastName}
                </p>

                <p className="card-text mb-1">
                    <strong>Category:</strong> {book.category?.name}
                </p>

                <p className="card-text mb-1">
                    <strong>Year:</strong> {book.year}
                </p>

                {book.available ? (
                    <span className="badge text-bg-success">Available</span>
                ) : (
                    <span className="badge text-bg-danger">
                        Not available
                    </span>
                )}
            </div>

            <div className="card-footer">
                <button
                    className="btn btn-primary w-100 mb-2"
                    disabled={!book.available}
                >
                    Reserve book
                </button>

                <div className="d-flex gap-2">
                    <Link
                        to={`/edit-book/${book.id}`}
                        className="btn btn-warning flex-fill"
                    >
                        Edit
                    </Link>

                    <button
                        className="btn btn-danger flex-fill"
                        onClick={() => onDelete(book.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookCard