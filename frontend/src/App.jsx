import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePage.jsx'
import AddAuthorPage from './Pages/AddAuthorPage.jsx'
import AddBookPage from './Pages/AddBookPage.jsx'
import AddCategoryPage from './Pages/AddCategoryPage.jsx'
import AuthorsPage from './Pages/AuthorsPage.jsx'
import CategoriesPage from './Pages/CategoriesPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import ReservationsPage from './Pages/ReservationsPage.jsx'
import LoansPage from './Pages/LoansPage.jsx'

import Navbar from './Components/Navbar.jsx'

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-book" element={<AddBookPage />} />
                <Route path="/edit-book/:id" element={<AddBookPage />} />
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/add-author" element={<AddAuthorPage />} />
                <Route path="/edit-author/:id" element={<AddAuthorPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/add-category" element={<AddCategoryPage />} />
                <Route path="/edit-category/:id" element={<AddCategoryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/loans" element={<LoansPage />} />
            </Routes>
        </>
    )
}

export default App