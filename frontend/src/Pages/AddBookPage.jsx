import { useEffect, useState } from 'react'
import { createBook, getBookById, updateBook } from '../api/booksApi.js'
import { getAuthors } from '../api/authorsApi.js'
import { getCategories } from '../api/categoriesApi.js'
import { Link, useNavigate, useParams } from 'react-router-dom'

function AddBookPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = Boolean(id)

    const [book, setBook] = useState({
        title: '',
        year: '',
        authorId: '',
        categoryId: '',
        available: true,
    })

    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        getAuthors()
            .then(setAuthors)
            .catch(() => setMessage('Error while loading authors.'))

        getCategories()
            .then(setCategories)
            .catch(() => setMessage('Error while loading categories.'))

        if (isEdit) {
            getBookById(id)
                .then((loadedBook) => {
                    setBook({
                        title: loadedBook.title,
                        year: loadedBook.year,
                        authorId: loadedBook.author?.id ?? '',
                        categoryId: loadedBook.category?.id ?? '',
                        available: loadedBook.available,
                    })
                })
                .catch(() => setMessage('Error while loading book.'))
        }
    }, [id, isEdit])

    function handleChange(event) {
        const { name, value, checked, type } = event.target

        setBook((currentBook) => ({
            ...currentBook,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        const requestBody = {
            title: book.title,
            year: Number(book.year),
            available: book.available,
            authorId: Number(book.authorId),
            categoryId: Number(book.categoryId),
        }

        const request = isEdit
            ? updateBook(id, requestBody)
            : createBook(requestBody)

        request
            .then(() => navigate('/'))
            .catch(() => {
                setMessage(
                    isEdit
                        ? 'Error while updating book.'
                        : 'Error while adding book.'
                )
            })
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-black">
                {isEdit ? 'Edit Book' : 'Add Book'}
            </h2>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Year</label>
                    <input
                        name="year"
                        type="number"
                        value={book.year}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <select
                        name="authorId"
                        value={book.authorId}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Choose author</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.firstName} {author.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        name="categoryId"
                        value={book.categoryId}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Choose category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="available"
                        name="available"
                        checked={book.available}
                        onChange={handleChange}
                    />

                    <label className="form-check-label" htmlFor="available">
                        Available
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">
                    {isEdit ? 'Save changes' : 'Save book'}
                </button>

                <Link to="/" className="btn btn-secondary ms-2">
                    Cancel
                </Link>
            </form>
        </div>
    )
}

export default AddBookPage