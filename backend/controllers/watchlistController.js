const Watchlist = require("../models/Watchlist")

const addToWatchlist = async (req, res) => {
    try {
        const { movieId, title, posterPath, releaseDate, voteAverage } = req.body

        if (!movieId || !title) {
            return res.status(400).json({
                success: false,
                message: "Movie information is required"
            })
        }

        const existingMovie = await Watchlist.findOne({
            user: req.userId,
            movieId
        })

        if (existingMovie) {
            return res.status(409).json({
                success: false,
                message: "Movie is already in your watchlist"
            })
        }

        const watchlistMovie = await Watchlist.create({
            user: req.userId,
            movieId,
            title,
            posterPath,
            releaseDate,
            voteAverage
        })

        res.status(201).json({
            success: true,
            message: "Movie added to watchlist",
            movie: watchlistMovie
        })
    }
    catch (error) {
        console.error(error.message)

        res.status(500).json({
            success: false,
            message: "Failed to add movie to watchlist"
        })
    }
}


const getWatchlist = async (req, res) => {
    try {
        const movies = await Watchlist.find({
            user: req.userId
        }).sort({ createdAt: -1 })

        res.json({
            success: true,
            movies
        })
    }
    catch (error) {
        console.error(error.message)

        res.status(500).json({
            success: false,
            message: "Failed to fetch watchlist"
        })
    }
}

const removeFromWatchlist = async (req, res) => {
    try {
        const { movieId } = req.params

        const movie = await Watchlist.findOneAndDelete({
            user: req.userId,
            movieId: Number(movieId),
        })

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found in watchlist',
            })
        }

        res.json({
            success: true,
            message: 'Movie removed from watchlist',
        })
    } catch (error) {
        console.error(error.message)

        res.status(500).json({
            success: false,
            message: 'Failed to remove movie',
        })
    }
}

module.exports = {
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist
}