import { Link } from 'react-router-dom'

function Navbar() {
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
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Books
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/authors">
                                Authors
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">
                                Categories
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/add-book">
                                Add Book
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar