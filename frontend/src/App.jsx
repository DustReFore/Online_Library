import { Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import AddAuthorPage from './pages/AddAuthorPage.jsx'
import AddBookPage from './pages/AddBookPage.jsx'
import AddCategoryPage from "./Pages/AddCategoryPage.jsx";

import Navbar from "./Components/Navbar.jsx"

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-author" element={<AddAuthorPage />} />
                <Route path="/add-category" element={<AddCategoryPage />} />
                <Route path="/add-book" element={<AddBookPage />} />
            </Routes>
        </>
    );
}
export default App;
