const { getTrendingMovies, getPopularMovies, searchMovies: searchMoviesFromTMDB, getMovieDetails } = require("../services/tmdbService")

const getTrending = async (req, res) => {
    try {
        const movies = await getTrendingMovies()

        res.json({
            success: true,
            movies
        })
    }
    catch (error) {
        console.error(error.message)

        res.status(500).json({
            success: false,
            message: "Failed to fetch trending movies"
        })
    }
}

const getPopular = async (req, res) => {
    try {
        const movies = await getPopularMovies()

        res.json({
            success: true,
            movies
        })
    }
    catch (error) {
        console.error(error.message)

        res.status(500).json({
            success: false,
            message: "Failed to fetch popular movies"
        })
    }
}

const searchMovies = async (req, res) => {
    try {
        const { query } = req.query

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            })
        }

        const movies = await searchMoviesFromTMDB(query)

        res.json({
            success: true,
            movies
        })
    }
    catch (error) {
        console.error(error.message)

        res.status(500).json({
            success: false,
            message: "Failed to search movies"
        })
    }
}

const getMovie = async (req, res) => {
    try {
        const { id } = req.params

        const movie = await getMovieDetails(id)

        res.json({
            success: true,
            movie
        })
    }
    catch (error) {
        console.error(error.message)

        res.status(500).json({
            success: false,
            message: "Failed to fetch movie details"
        })
    }
}

module.exports = {
    getTrending,
    getPopular,
    searchMovies,
    getMovie
}