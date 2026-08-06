import { Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage.jsx'

import Navbar from "./Components/Navbar.jsx"

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    );
}
export default App;
