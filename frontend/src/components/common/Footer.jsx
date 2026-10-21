
import { Link } from 'react-router-dom'
import {
    FaGithub,
    FaLinkedin,
    FaFilm,
    FaArrowUp,
    FaDiscord,
    FaInstagram,
    FaFacebook,
} from 'react-icons/fa'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="mt-20 border-t border-white/10 bg-black">
            <div className="page-container py-12 sm:py-14">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">


                    <div>
                        <Link
                            to="/"
                            className="flex items-center gap-2">
                            <FaFilm className="text-red-500 text-xl" />

                            <span className="text-xl font-bold">Node<span className="text-red-500">Plex</span></span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-7 text-gray-400">
                            Discover your next favorite movie. Save the stories you love
                            and keep your movie journey in one place.
                        </p>
                    </div>


                    <div>
                        <h3 className="font-semibold text-white">Explore</h3>

                        <ul className="mt-4 space-y-3 text-sm text-gray-400">
                            <li>
                                <Link
                                    to="/"
                                    className="transition hover:text-red-400"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/movies"
                                    className="transition hover:text-red-400"
                                >
                                    Browse Movies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/watchlist"
                                    className="transition hover:text-red-400"
                                >
                                    My Watchlist
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="transition hover:text-red-400"
                                >
                                    My Profile
                                </Link>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="font-semibold text-white">About NodePlex
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            A personal movie discovery project built for movie lovers
                            who enjoy finding, rating, and reviewing great films.
                        </p>

                        <p className="mt-3 text-xs leading-5 text-gray-500">
                            Movie data provided by TMDB. <br />
                            NodePlex is not endorsed or certified by TMDB.
                        </p>
                    </div>


                    <div>
                        <h3 className="font-semibold text-white">Let's Connect</h3>

                        <p className="mt-4 text-sm leading-6 text-gray-400">
                            Connect with me.
                        </p>

                        <div className="mt-5 flex gap-3">
                            <a
                                href="https://github.com/azizulhakim31"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                            >
                                <FaGithub size={19} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/aazizul-hakim-7420b2355/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                            >
                                <FaLinkedin size={19} />
                            </a>

                            <a
                                href="https://www.discord.com/users/1539562290230075423"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                            >
                                <FaDiscord size={19} />
                            </a>

                            <a
                                href="https://www.instagram.com/azizul_hakim477/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                            >
                                <FaInstagram size={19} />
                            </a>

                            <a
                                href="https://www.facebook.com/azizul.hakim.272755"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                            >
                                <FaFacebook size={19} />
                            </a>
                        </div>
                    </div>
                </div>


                <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <p className="text-xs text-gray-500">
                        &copy; {currentYear} NodePlex
                        . All rights reserved.
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                        aria-label="Scroll to top"
                        className="mx-auto flex items-center gap-2 text-xs text-gray-400 transition hover:text-red-400 sm:mx-0"
                    >
                        Back to top <FaArrowUp />
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer
