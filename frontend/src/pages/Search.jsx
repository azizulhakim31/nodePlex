import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies } from "../services/movieService";
import MovieCard from "../components/movies/MovieCard";

const Search = () => {
    const [searchParams] = useSearchParams()

    const query = searchParams.get("query") || ""

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const loadMovies = async () => {
            if (!query) {
                setMovies([])
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError("")

                const results = await searchMovies(query)

                setMovies(results)
            }
            catch (error) {
                console.error(error)
                setError("Failed to search movies.")
            }
            finally {
                setLoading(false)
            }
        }

        loadMovies()
    }, [query])

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">
            <h1 className="text-2xl font-bold">Showing results for "{query}"</h1>

            {loading && (
                <p className="mt-8 text-gray-400">Searching movies...</p>
            )}

            {error && (
                <p className="mt-8 text-red-400">{error}</p>
            )}

            {!loading && !error && movies.length === 0 && (
                <p className="mt-8 text-gray-400">No movies found</p>
            )}

            {!loading && !error && movies.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}



        </div>
    );
};

export default Search;