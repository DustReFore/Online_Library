import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    deleteCategory,
    getCategories,
} from '../api/categoriesApi.js'

function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => setMessage('Error while loading categories.'))
    }, [])

    async function handleDelete(id) {
        const confirmed = window.confirm(
            'Are you sure you want to delete this category?'
        )

        if (!confirmed) {
            return
        }

        try {
            await deleteCategory(id)

            setCategories((currentCategories) =>
                currentCategories.filter(
                    (category) => category.id !== id
                )
            )
        } catch (error) {
            console.error(error)
            setMessage(
                'The category cannot be deleted. It may be connected to a book.'
            )
        }
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between mb-4">
                <h2>Categories</h2>

                <Link to="/add-category" className="btn btn-primary">
                    Add category
                </Link>
            </div>

            {message && (
                <div className="alert alert-danger">
                    {message}
                </div>
            )}

            {categories.length === 0 ? (
                <div className="alert alert-warning">
                    No categories found.
                </div>
            ) : (
                <table className="table table-striped align-middle">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>

                            <td>
                                <Link
                                    to={`/edit-category/${category.id}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleDelete(category.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default CategoriesPage