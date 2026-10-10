import { useAuth } from '../context/AuthContext'
import { addToWatchlist } from '../services/watchlistService'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaCalendarAlt, FaStar } from 'react-icons/fa'

import { getMovieDetails } from '../services/movieService'

function MovieDetails() {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()

    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [watchlistLoading, setWatchlistLoading] = useState(false)
    const [watchlistMessage, setWatchlistMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const loadMovie = async () => {
            try {
                setLoading(true)
                setError('')

                const data = await getMovieDetails(id)

                setMovie(data)
            } catch (error) {
                console.error(error)
                setError('Failed to load movie details.')
            } finally {
                setLoading(false)
            }
        }

        loadMovie()
    }, [id])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-400">
                    Loading movie...
                </p>
            </div>
        )
    }

    if (error || !movie) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <p className="text-red-400">
                    {error || 'Movie not found.'}
                </p>

                <Link
                    to="/"
                    className="text-red-500 hover:text-red-400"
                >
                    Go back home
                </Link>
            </div>
        )
    }

    const handleAddToWatchlist = async () => {
        if (!user) {
            navigate('/login')
            return
        }

        try {
            setWatchlistLoading(true)
            setWatchlistMessage('')

            await addToWatchlist({
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                releaseDate: movie.release_date,
                voteAverage: movie.vote_average,
            })

            setWatchlistMessage('Added to your watchlist!')
        } catch (error) {
            setWatchlistMessage(
                error.response?.data?.message ||
                'Failed to add movie'
            )
        } finally {
            setWatchlistLoading(false)
        }
    }

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : ''

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'

    const year = movie.release_date
        ? movie.release_date.substring(0, 4)
        : 'N/A'

    return (
        <main className="relative min-h-screen">

            <div
                className="absolute inset-0 h-150 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${backdropUrl})`,
                }}
            />

            <div className="absolute inset-0 h-150 bg-linear-to-b from-black/50 via-black/80 to-[#0f0f0f]" />

            <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">

                <Link
                    to="/"
                    className="mb-6 inline-flex items-center gap-2 text-gray-300 transition hover:text-white sm:mb-10"
                >
                    <FaArrowLeft />
                    Back
                </Link>

                <div className="grid min-w-0 gap-6 pt-8 md:grid-cols-[280px_minmax(0,1fr)] md:gap-8 md:pt-20">

                    <div className="mx-auto w-full max-w-55 md:max-w-none">
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            className="w-full rounded-xl shadow-2xl"
                        />
                    </div>

                    <div className="min-w-0 self-center">

                        <h1 className="wrap-break-words text-3xl font-bold sm:text-4xl md:text-5xl">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="mt-3 italic text-gray-400">
                                "{movie.tagline}"
                            </p>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300 sm:mt-5">

                            <span className='flex gap-1'><FaCalendarAlt />{year}</span>

                            {movie.runtime && (
                                <span>
                                    {movie.runtime} min
                                </span>
                            )}

                            <span className="flex items-center gap-1">
                                <FaStar className="text-yellow-400" />
                                {movie.vote_average?.toFixed(1)}
                            </span>

                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="rounded-full bg-red-900 px-3 py-1 text-xs text-gray-300 font-semibold"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <p className="mt-6 max-w-3xl leading-7 text-gray-300">
                            {movie.overview || 'No description available.'}
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">

                            <button
                                onClick={handleAddToWatchlist}
                                disabled={watchlistLoading}
                                className="rounded-md bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {watchlistLoading
                                    ? 'Adding...'
                                    : '+ Add to Watchlist'}
                            </button>


                            <button className="w-full rounded-md border border-gray-600 px-6 py-3 font-semibold transition hover:bg-white hover:text-black sm:w-auto">
                                Rate Movie
                            </button>

                        </div>
                            {watchlistMessage && (
                                <p className="mt-3 text-sm text-gray-400">
                                    {watchlistMessage}
                                </p>
                            )}

                    </div>

                </div>

            </div>

        </main>
    )
}

export default MovieDetails