import BookCard from './BookCard.jsx'

function BookList({ books, onDelete, onReserve }) {
    if (books.length === 0) {
        return (
            <div className="alert alert-warning">
                No books found.
            </div>
        )
    }

    return (
        <div className="row g-4">
            {books.map((book) => (
                <div
                    className="col-12 col-md-6 col-lg-4"
                    key={book.id}
                >
                    <BookCard
                        book={book}
                        onDelete={onDelete}
                        onReserve={onReserve}
                    />
                </div>
            ))}
        </div>
    )
}

export default BookList