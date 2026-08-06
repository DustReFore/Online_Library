import { useState } from 'react'
import { createAuthor } from '../api/authorsApi.js'

function AddAuthorPage() {
    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
        yearOfBirth: '',
        country: '',
    })

    const [message, setMessage] = useState('')

    function handleChange(event) {
        const { name, value } = event.target
        setAuthor({ ...author, [name]: value })
    }

    function handleSubmit(event) {
        event.preventDefault()

        createAuthor({
            ...author,
            yearOfBirth: Number(author.yearOfBirth),
        })
            .then(() => {
                setMessage('Author added successfully.')
                setAuthor({
                    firstName: '',
                    lastName: '',
                    yearOfBirth: '',
                    country: '',
                })
            })
            .catch(() => setMessage('Error while adding author.'))
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4">Add Author</h2>

            {message && <div className="alert alert-info">{message}</div>}

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

                <button className="btn btn-primary">Save author</button>
            </form>
        </div>
    )
}

export default AddAuthorPage;