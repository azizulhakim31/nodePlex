import { useEffect, useState } from 'react'

import HeroSection from '../components/movies/HeroSection'
import MovieSection from '../components/movies/MovieSection'

import {
  getTrendingMovies,
  getPopularMovies
} from '../services/movieService'

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [trending, popular] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies()
        ])

        setTrendingMovies(trending)
        setPopularMovies(popular)
      } catch (error) {
        console.error(error)
        setError('Failed to load movies.')
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400">
          Loading movies...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-400">
          {error}
        </p>
      </div>
    )
  }

  return (
    <>
      <HeroSection />

      <MovieSection
        title="Trending Now"
        movies={trendingMovies}
      />

      <MovieSection
        title="Popular Movies"
        movies={popularMovies}
      />
    </>
  )
}

export default Home