import { Link, NavLink } from 'react-router-dom'

function Navbar() {
    const currentUser = JSON.parse(
        localStorage.getItem('currentUser')
    )

    const isAdmin = currentUser?.role === 'ADMIN'

    function getNavLinkClass({ isActive }) {
        return isActive ? 'nav-link active' : 'nav-link'
    }

    function handleLogout() {
        localStorage.removeItem('currentUser')
        window.location.href = '/'
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    Online Library
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="mainNavbar"
                >
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink
                                className={getNavLinkClass}
                                to="/"
                            >
                                Books
                            </NavLink>
                        </li>

                        {isAdmin && (
                            <>
                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="/authors">
                                        Authors
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="/categories">
                                        Categories
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="/add-book">
                                        Add Book
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        {currentUser ? (
                            <>
                                <li className="nav-item">
                                    <span className="navbar-text me-lg-3">
                                        {currentUser.fullName}
                                        {' '}
                                        <span className="badge text-bg-secondary">
                                            {currentUser.role}
                                        </span>
                                    </span>
                                </li>

                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className="btn btn-outline-light"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className={getNavLinkClass}
                                        to="/login"
                                    >
                                        Login
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className="btn btn-outline-light ms-lg-2"
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar