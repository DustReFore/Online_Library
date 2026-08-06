import { useState } from 'react'
import { createCategory } from '../api/categoriesApi.js'

function AddCategoryPage() {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        createCategory({ name })
            .then(() => {
                setMessage('Category added successfully.')
                setName('')
            })
            .catch(() => setMessage('Error while adding category.'))
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4">Add Category</h2>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Category name</label>
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <button className="btn btn-primary">Save category</button>
            </form>
        </div>
    )
}

export default AddCategoryPage