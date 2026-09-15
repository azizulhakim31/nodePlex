import { Link, NavLink } from "react-router-dom";
import { FaFilm, FaSearch, FaUser } from 'react-icons/fa'

const Navbar = () => {
    const navLinkClass = ({ isActive }) => `transition ${isActive ? 'font-semibold text-red-500' : 'text-gray-300 hover:text-white'}`
    return (
        <nav className="border-b border-gray-700 px-6 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <FaFilm className="text-red-500 text-2xl" />

                    <span className="text-2xl font-bold">Node<span className="text-red-500">Plex</span></span>
                </Link>
                <div className="flex items-center gap-6">
                    <NavLink to="/" className={navLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/movies" className={navLinkClass}>
                        Movies
                    </NavLink>
                    <NavLink to="/watchlist" className={navLinkClass}>
                        Watchlist
                    </NavLink>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-gray-300 transition hover:text-white">
                        <FaSearch />
                    </button>

                    <NavLink to="/profile" className={navLinkClass}>
                        <FaUser className="text-xl" />
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;