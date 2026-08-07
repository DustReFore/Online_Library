import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    deleteAuthor,
    getAuthors,
} from '../api/authorsApi.js'

function AuthorsPage() {
    const [authors, setAuthors] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        getAuthors()
            .then(setAuthors)
            .catch(() => setMessage('Error while loading authors.'))
    }, [])

    async function handleDelete(id) {
        const confirmed = window.confirm(
            'Are you sure you want to delete this author?'
        )

        if (!confirmed) {
            return
        }

        try {
            await deleteAuthor(id)

            setAuthors((currentAuthors) =>
                currentAuthors.filter((author) => author.id !== id)
            )
        } catch (error) {
            console.error(error)
            setMessage(
                'The author cannot be deleted. It may be connected to a book.'
            )
        }
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between mb-4">
                <h2>Authors</h2>

                <Link to="/add-author" className="btn btn-primary">
                    Add author
                </Link>
            </div>

            {message && (
                <div className="alert alert-danger">
                    {message}
                </div>
            )}

            {authors.length === 0 ? (
                <div className="alert alert-warning">
                    No authors found.
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped align-middle">
                        <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Year of birth</th>
                            <th>Country</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {authors.map((author) => (
                            <tr key={author.id}>
                                <td>{author.firstName}</td>
                                <td>{author.lastName}</td>
                                <td>{author.yearOfBirth}</td>
                                <td>{author.country}</td>
                                <td>
                                    <Link
                                        to={`/edit-author/${author.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(author.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AuthorsPage