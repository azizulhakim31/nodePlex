import { Link, NavLink } from "react-router-dom";
import { FaFilm } from 'react-icons/fa'
import SearchBar from "./SearchBar";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { user, signout } = useAuth()
    const initials = user?.name
        ?.trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((namePart) => namePart.charAt(0).toUpperCase())
        .join("")
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

                    {user && (
                        <NavLink
                            to="/watchlist"
                            className={navLinkClass}>
                            Watchlist
                        </NavLink>
                    )}
                </div>

                <div className="order-3 flex w-full min-w-0 items-center gap-3 sm:order-3 sm:w-64 sm:gap-6 md:w-80">
                    <SearchBar />

                    {user ? (
                        <>
                            <NavLink
                                to="/profile"
                                aria-label={`Profile${user.name ? `: ${user.name}` : ""}`}
                                title={user.name}
                                className={`${navLinkClass} flex shrink-0 items-center justify-center`}>
                                <span
                                    aria-hidden="true"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/50 bg-red-500/15 text-sm font-semibold text-amber-400">
                                    {initials}
                                </span>
                            </NavLink>

                            <button
                                type="button"
                                onClick={signout}
                                className="rounded-md border border-gray-700 px-3 py-2 text-sm text-gray-300 cursor-pointer transition hover:border-red-500 hover:text-white text-nowrap">
                                Sign out
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/signin"
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold transition hover:bg-red-700 text-nowrap">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;