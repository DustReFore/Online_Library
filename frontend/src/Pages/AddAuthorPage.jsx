import { useEffect, useState } from 'react'
import {
    createAuthor,
    getAuthorById,
    updateAuthor,
} from '../api/authorsApi.js'
import { Link, useNavigate, useParams } from 'react-router-dom'

function AddAuthorPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = Boolean(id)

    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
        yearOfBirth: '',
        country: '',
    })

    const [message, setMessage] = useState('')

    useEffect(() => {
        if (isEdit) {
            getAuthorById(id)
                .then((loadedAuthor) => {
                    setAuthor({
                        firstName: loadedAuthor.firstName,
                        lastName: loadedAuthor.lastName,
                        yearOfBirth: loadedAuthor.yearOfBirth,
                        country: loadedAuthor.country,
                    })
                })
                .catch(() => {
                    setMessage('Error while loading author.')
                })
        }
    }, [id, isEdit])

    function handleChange(event) {
        const { name, value } = event.target

        setAuthor((currentAuthor) => ({
            ...currentAuthor,
            [name]: value,
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        const requestBody = {
            firstName: author.firstName,
            lastName: author.lastName,
            yearOfBirth: Number(author.yearOfBirth),
            country: author.country,
        }

        const request = isEdit
            ? updateAuthor(id, requestBody)
            : createAuthor(requestBody)

        request
            .then(() => navigate('/authors'))
            .catch(() => {
                setMessage(
                    isEdit
                        ? 'Error while updating author.'
                        : 'Error while adding author.'
                )
            })
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4">
                {isEdit ? 'Edit Author' : 'Add Author'}
            </h2>

            {message && (
                <div className="alert alert-danger">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">First name</label>

                    <input
                        name="firstName"
                        value={author.firstName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Last name</label>

                    <input
                        name="lastName"
                        value={author.lastName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Year of birth</label>

                    <input
                        name="yearOfBirth"
                        type="number"
                        value={author.yearOfBirth}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Country</label>

                    <input
                        name="country"
                        value={author.country}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">
                        {isEdit ? 'Save changes' : 'Save author'}
                    </button>

                    <Link
                        to="/authors"
                        className="btn btn-secondary ms-2"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default AddAuthorPage