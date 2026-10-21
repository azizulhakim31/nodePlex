import { useEffect, useMemo, useState } from "react";
import MovieCard from "../components/movies/MovieCard";
import {
    getPopularMovies,
    getTrendingMovies,
} from "../services/movieService";

const Movies = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("popular");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const [trending, popular] = await Promise.all([
                    getTrendingMovies(),
                    getPopularMovies(),
                ]);

                setTrendingMovies(trending);
                setPopularMovies(popular);
            } catch (error) {
                console.error(error);
                setError("Failed to load movies.");
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    const movies = useMemo(() => {
        const moviesById = new Map();
        const selectedMovies = category === "trending"
            ? trendingMovies
            : category === "popular"
                ? popularMovies
                : [...trendingMovies, ...popularMovies];

        selectedMovies.forEach((movie) => {
            moviesById.set(movie.id, movie);
        });

        const filteredMovies = [...moviesById.values()];

        return filteredMovies.sort((a, b) => {
            if (sortBy === "rating") {
                return (b.vote_average || 0) - (a.vote_average || 0);
            }
            if (sortBy === "newest") {
                return (b.release_date || "").localeCompare(a.release_date || "");
            }
            if (sortBy === "title") {
                return (a.title || "").localeCompare(b.title || "");
            }
            return (b.popularity || 0) - (a.popularity || 0);
        });
    }, [category, popularMovies, sortBy, trendingMovies]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-400">Loading movies...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-7xl px-6 py-16">
                <h1 className="text-3xl font-bold">Browse Movies</h1>
                <p className="mt-4 text-red-400">{error}</p>
            </div>
        );
    }

    const categories = [
        { value: "all", label: "All movies" },
        { value: "trending", label: "Trending" },
        { value: "popular", label: "Popular" },
    ];

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">
            <header>
                <h1 className="text-3xl font-bold">Browse Movies</h1>
                <p className="mt-2 text-gray-400">
                    Explore trending and popular movies, then filter by category or sort the results.
                </p>
            </header>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2" aria-label="Filter movies by category">
                    {categories.map(({ value, label }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setCategory(value)}
                            aria-pressed={category === value}
                            className={`rounded-full border px-4 py-2 text-sm transition ${
                                category === value
                                    ? "border-red-500 bg-red-600 text-white"
                                    : "border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div>
                    <label className="sr-only" htmlFor="movie-sort">Sort movies</label>
                    <select
                        id="movie-sort"
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}
                        className="rounded-md border border-gray-700 bg-[#181818] px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                    >
                        <option value="popular">Most popular</option>
                        <option value="rating">Top rated</option>
                        <option value="newest">Newest</option>
                        <option value="title">Title A-Z</option>
                    </select>
                </div>
            </div>

            <p className="mt-6 text-sm text-gray-400">
                {movies.length} {movies.length === 1 ? "movie" : "movies"}
            </p>

            {movies.length > 0 ? (
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p className="mt-8 text-gray-400">
                    No movies found in this category.
                </p>
            )}
        </div>
    );
};

export default Movies;
