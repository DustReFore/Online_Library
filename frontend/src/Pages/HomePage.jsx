import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteBook, getBooks } from '../api/booksApi.js'
import { createReservation } from '../api/reservationsApi.js'
import BookList from '../Components/BookList.jsx'
import SearchBar from '../Components/SearchBar.jsx'

function HomePage() {
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getBooks()
            .then((data) => setBooks(data))
            .catch((error) => console.error('Error loading books', error))
    }, [])

    const filteredBooks = books.filter((book) => {
        const searchValue = searchTerm.toLowerCase()

        return (
            book.title?.toLowerCase().includes(searchValue) ||
            book.author?.firstName?.toLowerCase().includes(searchValue) ||
            book.author?.lastName?.toLowerCase().includes(searchValue) ||
            book.category?.name?.toLowerCase().includes(searchValue)
        )
    })

    async function handleReserve(bookId) {
        const currentUser = JSON.parse(
            localStorage.getItem('currentUser')
        )

        if (!currentUser) {
            alert('Please log in before reserving a book.')
            navigate('/login')
            return
        }

        try {
            await createReservation(currentUser.id, bookId)

            setBooks((currentBooks) =>
                currentBooks.map((book) =>
                    book.id === bookId
                        ? { ...book, available: false }
                        : book
                )
            )

            alert('Book reserved successfully.')
        } catch (error) {
            console.error('Error reserving book:', error)
            alert('The book could not be reserved.')
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            'Are you sure you want to delete this book?'
        )

        if (!confirmed) {
            return
        }

        try {
            await deleteBook(id)

            setBooks((currentBooks) =>
                currentBooks.filter((book) => book.id !== id)
            )
        } catch (error) {
            console.error('Error deleting book:', error)
            alert('Error while deleting book.')
        }
    }

    return (
        <main>
            <section className="bg-light py-5">
                <div className="container text-center">
                    <h1 className="display-5 fw-bold text-black">Online Library</h1>
                    <p className="lead text-muted">
                        Search, reserve and manage books in one simple web application.
                    </p>
                </div>
            </section>

            <section id="catalog" className="py-5">
                <div className="container">
                    <h2 className="mb-4 text-black">Book Catalog</h2>

                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />

                    <BookList
                        books={filteredBooks}
                        onDelete={handleDelete}
                        onReserve={handleReserve}
                    />
                </div>
            </section>
        </main>
    )
}

export default HomePage;