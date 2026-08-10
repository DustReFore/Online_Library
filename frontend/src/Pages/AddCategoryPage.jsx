import { useEffect, useState } from 'react'
import {
    createCategory,
    getCategoryById,
    updateCategory,
} from '../api/categoriesApi.js'
import { Link, useNavigate, useParams } from 'react-router-dom'

function AddCategoryPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = Boolean(id)

    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (isEdit) {
            getCategoryById(id)
                .then((category) => setName(category.name))
                .catch(() => {
                    setMessage('Error while loading category.')
                })
        }
    }, [id, isEdit])

    function handleSubmit(event) {
        event.preventDefault()

        const request = isEdit
            ? updateCategory(id, { name })
            : createCategory({ name })

        request
            .then(() => navigate('/categories'))
            .catch(() => {
                setMessage(
                    isEdit
                        ? 'Error while updating category.'
                        : 'Error while adding category.'
                )
            })
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-black">
                {isEdit ? 'Edit Category' : 'Add Category'}
            </h2>

            {message && (
                <div className="alert alert-danger">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">
                        Category name
                    </label>

                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">
                        {isEdit ? 'Save changes' : 'Save category'}
                    </button>

                    <Link
                        to="/categories"
                        className="btn btn-secondary ms-2"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default AddCategoryPage