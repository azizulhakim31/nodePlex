const { getTrendingMovies, getPopularMovies } = require("../services/tmdbService")

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

module.exports = { getTrending, getPopular }