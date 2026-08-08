import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../api/authApi.js'

function LoginPage() {
    const [form, setForm] = useState({
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
            const user = await loginUser(form)

            localStorage.setItem(
                'currentUser',
                JSON.stringify(user)
            )

            window.location.href = '/'
        } catch (error) {
            console.error(error)
            setMessage('Incorrect email or password.')
        }
    }

    return (
        <div className="container py-5">
            <div className="card p-4 shadow-sm mx-auto"
                 style={{ maxWidth: '500px' }}>
                <h2 className="mb-4">Login</h2>

                {message && (
                    <div className="alert alert-danger">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
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
                            value={form.password}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <button className="btn btn-primary">
                        Login
                    </button>

                    <Link to="/register" className="btn btn-link">
                        Create account
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default LoginPage