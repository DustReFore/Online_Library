import BookCard from './BookCard'

function BookList({ books }) {
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
                <div className="col-12 col-md-6 col-lg-4" key={book.id}>
                    <BookCard book={book} />
                </div>
            ))}
        </div>
    )
}

export default BookList;