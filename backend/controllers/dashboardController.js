const User = require("../models/User")
const Watchlist = require("../models/Watchlist")
const Review = require("../models/Review")
const { getMovieDetails } = require("../services/tmdbService")

const getDashboard = async (req, res) => {
    try {
        const [user, watchlistCount, reviews] = await Promise.all([
            User.findById(req.userId).select("name email createdAt"),

            Watchlist.countDocuments({
                user: req.userId
            }),

            Review.find({ user: req.userId })
                .select("movieId movieTitle userName rating comment createdAt updatedAt")
                .sort({ updatedAt: -1 })
        ])

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const reviewsWithoutTitles = reviews.filter(
            (review) => !review.movieTitle?.trim()
        )

        await Promise.all(
            reviewsWithoutTitles.map(async (review) => {
                const movie = await getMovieDetails(review.movieId)
                const movieTitle = movie.title?.trim()

                if (!movieTitle) {
                    throw new Error(`Movie title not found for movie ${review.movieId}`)
                }

                await Review.updateOne(
                    { _id: review._id },
                    { $set: { movieTitle } },
                    { timestamps: false }
                )
                review.movieTitle = movieTitle
            })
        )

        const averageRating = reviews.length ? Number(
            (
                reviews.reduce(
                    (sum, review) => sum + review.rating, 0) / reviews.length
            ).toFixed(1)
        ) : 0

        res.json({
            success: true,
            dashboard: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    joinedAt: user.createdAt
                },
                watchlistCount,
                reviewCount: reviews.length,
                averageRating,
                reviews
            }
        })
    }
    catch (error) {
        console.error(error.message)

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard"
        })
    }
}

module.exports = { getDashboard }