import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePage.jsx'
import AddAuthorPage from './Pages/AddAuthorPage.jsx'
import AddBookPage from './Pages/AddBookPage.jsx'
import AddCategoryPage from './Pages/AddCategoryPage.jsx'
import AuthorsPage from './Pages/AuthorsPage.jsx'
import CategoriesPage from './Pages/CategoriesPage.jsx'

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
            </Routes>
        </>
    )
}

export default App