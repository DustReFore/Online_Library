import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/authApi.js'

function RegisterPage() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
    })

    const [message, setMessage] = useState('')

    function handleChange(event) {
        const { name, value } = event.target

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setMessage('')

        try {
            await registerUser(form)
            navigate('/login')
        } catch (error) {
            console.error(error)
            setMessage(error.message)
        }
    }

    return (
        <div className="container py-5">
            <div className="card p-4 shadow-sm mx-auto"
                 style={{ maxWidth: '500px' }}>
                <h2 className="mb-4 text-black">Register</h2>

                {message && (
                    <div className="alert alert-danger">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Full name</label>
                        <input
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            minLength="8"
                            value={form.password}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <button className="btn btn-primary">
                        Register
                    </button>

                    <Link to="/login" className="btn btn-link">
                        Already have an account?
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage