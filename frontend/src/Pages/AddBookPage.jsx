import { useEffect, useState } from 'react'
import { createBook } from '../api/booksApi.js'
import { getAuthors } from '../api/authorsApi.js'
import { getCategories } from '../api/categoriesApi.js'

function AddBookPage() {
    const [book, setBook] = useState({
        title: '',
        year: '',
        authorId: '',
        categoryId: '',
    })

    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        getAuthors()
            .then((data) => setAuthors(data))
            .catch(() => setMessage('Error while loading authors.'))

        getCategories()
            .then((data) => setCategories(data))
            .catch(() => setMessage('Error while loading categories.'))
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        setBook({ ...book, [name]: value })
    }

    function handleSubmit(event) {
        event.preventDefault()

        const requestBody = {
            title: book.title,
            year: Number(book.year),
            available: true,
            author: {
                id: Number(book.authorId),
            },
            category: {
                id: Number(book.categoryId),
            },
        }

        createBook(requestBody)
            .then(() => {
                setMessage('Book added successfully.')
                setBook({ title: '', year: '', authorId: '', categoryId: '' })
            })
            .catch(() => setMessage('Error while adding book.'))
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4">Add Book</h2>

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

                <button className="btn btn-primary">Save book</button>
            </form>
        </div>
    )
}

export default AddBookPage