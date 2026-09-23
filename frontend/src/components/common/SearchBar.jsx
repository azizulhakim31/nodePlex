import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const searchText = query.trim()

        if (!searchText) {
            return
        }

        navigate(`/search?query=${encodeURIComponent(searchText)}`)
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-sm items-center overflow-hidden rounded-md border border-gray-600 bg-[#181818]"
            >
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500"
                />

                <button
                    type="submit"
                    className="px-4 text-gray-400 transition hover:text-white"
                >
                    <FaSearch />
                </button>

            </form>

        </>
    );
};

export default SearchBar;