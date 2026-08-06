function BookCard({book}) {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>

                <p className="card-text mb-1">
                    <strong>Author:</strong> {book.author}
                </p>

                <p className="card-text mb-1">
                    <strong>Category:</strong> {book.category}
                </p>

                <p className="card-text mb-1">
                    <strong>Year:</strong> {book.year}
                </p>

                {book.available ? (
                    <span className="badge text-bg-success">Available</span>
                ) : (
                    <span className="badge text-bg-danger">Not available</span>
                )}
            </div>
            <div className="card-footer">
                <button className="btn btn-primary w-100" disabled={!book.available}>
                    Reserve book
                </button>
            </div>
        </div>
    )
}
export default BookCard;