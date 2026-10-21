import MovieCard from "./MovieCard";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieSection = ({ id, title, subtitle, movies = [] }) => {
    return (
        <section id={id} className="scroll-mt-24 px-6 py-8">
            <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                    <div className="mb-3 h-1 w-11 rounded-full bg-red-500" />
                    <h2 className="text-2xl font-bold text-white">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-3 text-gray-400">
                            {subtitle}
                        </p>
                    )}
                </div>
                <Link
                    to="/movies"
                    className="mb-1 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white transition hover:text-red-400"
                >
                    <span>Browse all</span>
                    <FaArrowRight aria-hidden="true" className="text-xs text-red-400" />
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            </div>
        </section>
    );
};

export default MovieSection;