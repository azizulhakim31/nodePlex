import { Link, NavLink } from "react-router-dom";
import { FaFilm, FaUser } from 'react-icons/fa'
import SearchBar from "./SearchBar";

const Navbar = () => {
    const navLinkClass = ({ isActive }) => `transition ${isActive ? 'font-semibold text-red-500' : 'text-gray-300 hover:text-white'}`
    return (
        <nav className="sticky top-0 z-50 border-b border-gray-700 bg-black px-4 py-3 sm:px-6 sm:py-4">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <Link
                    to="/"
                    className="flex items-center gap-2">
                    <FaFilm className="text-red-500 text-2xl" />

                    <span className="text-xl font-bold sm:text-2xl">Node<span className="text-red-500">Plex</span></span>
                </Link>

                <div className="order-2 flex w-full items-center justify-between gap-1 sm:order-2 sm:w-auto sm:justify-start sm:gap-2">
                    <NavLink
                        to="/"
                        className={navLinkClass}>
                        Home
                    </NavLink>

                    <NavLink
                        to="/movies"
                        className={navLinkClass}>
                        Movies
                    </NavLink>

                    <NavLink
                        to="/watchlist"
                        className={navLinkClass}>
                        Watchlist
                    </NavLink>
                </div>

                <div className="order-3 flex w-full min-w-0 items-center gap-3 sm:order-3 sm:w-64 sm:gap-6 md:w-80">
                    <SearchBar />

                    <NavLink
                        to="/profile"
                        aria-label="Profile"
                        title="Profile"
                        className={navLinkClass}>
                        <FaUser className="text-xl" />
                    </NavLink>

                    <Link
                        to="/register"
                        className="bg-red-600 rounded-md px-4 py-2 text-sm font-semibold transition hover:bg-red-700 text-nowrap">
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;