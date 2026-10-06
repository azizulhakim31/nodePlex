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