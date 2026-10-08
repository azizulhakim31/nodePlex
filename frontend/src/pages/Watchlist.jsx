import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaTrash } from 'react-icons/fa'

import {
  getWatchlist,
  removeFromWatchlist,
} from '../services/watchlistService'

function Watchlist() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchWatchlist = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getWatchlist()

      setMovies(data)
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Failed to load watchlist'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWatchlist()
  }, [])

  const handleRemove = async (movieId) => {
    try {
      await removeFromWatchlist(movieId)

      setMovies((currentMovies) =>
        currentMovies.filter(
          (movie) => movie.movieId !== movieId
        )
      )
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Failed to remove movie'
      )
    }
  }

  if (loading) {
    return (
      <div className="px-6 py-12 text-center text-gray-400">
        Loading your watchlist...
      </div>
    )
  }

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Watchlist
          </h1>

          <p className="mt-2 text-gray-400">
            Movies you want to watch later.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {movies.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-[#181818] px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">
              Your watchlist is empty
            </h2>

            <p className="mt-2 text-gray-400">
              Start adding movies you want to watch.
            </p>

            <Link
              to="/movies"
              className="mt-6 inline-block rounded-md bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {movies.map((movie) => {
              const posterUrl = movie.posterPath
                ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                : 'https://via.placeholder.com/500x750?text=No+Image'

              const year = movie.releaseDate
                ? movie.releaseDate.substring(0, 4)
                : 'N/A'

              return (
                <div
                  key={movie._id}
                  className="group overflow-hidden rounded-lg bg-[#181818]"
                >
                  <Link to={`/movies/${movie.movieId}`}>
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={posterUrl}
                        alt={movie.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-xs">
                        <FaStar className="text-yellow-400" />
                        <span>
                          {movie.voteAverage?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-3">
                    <h3 className="truncate font-semibold">
                      {movie.title}
                    </h3>

                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {year}
                      </span>

                      <button
                        onClick={() =>
                          handleRemove(movie.movieId)
                        }
                        className="text-gray-500 transition hover:text-red-500"
                        title="Remove from watchlist"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}

export default Watchlist