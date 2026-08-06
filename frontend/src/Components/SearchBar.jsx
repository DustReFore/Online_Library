function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div className="input-group mb-4">
            <span className="input-group-text">Search</span>
            <input
                type="text"
                className="form-control"
                placeholder="Search books by title, author or category..."
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
            />
        </div>
    )
}
export default SearchBar;