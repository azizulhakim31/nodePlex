const mongoose = require("mongoose")

const watchlistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        movieId: {
            type: Number,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        posterPath: {
            type: String,
            default: null
        },

        releaseDate: {
            type: String,
            default: null
        },

        voteAverage: {
            type: Number,
            default: 0
        },

    },
    {
        timestamps: true
    }
)

watchlistSchema.index(
    { user: 1, movieId: 1 },
    { unique: true }
)

module.exports = mongoose.model(
    "watchlist", watchlistSchema
)