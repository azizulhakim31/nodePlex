const Review = require('../models/Review')

const createOrUpdateReview = async (req, res) => {
    try {
        const { movieId, movieTitle, rating, comment } = req.body

        const parsedMovieId = Number(movieId)
        const parsedRating = Number(rating)

        if (
            !Number.isInteger(parsedMovieId) ||
            parsedMovieId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: 'A valid movie ID is required',
            })
        }

        if (
            !Number.isInteger(parsedRating) ||
            parsedRating < 1 ||
            parsedRating > 10
        ) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 10',
            })
        }

        if (
            typeof comment !== 'string' ||
            !comment.trim() ||
            comment.trim().length > 500
        ) {
            return res.status(400).json({
                success: false,
                message: 'Review must contain 1–500 characters',
            })
        }

        const User = require('../models/User')
        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User account not found',
            })
        }

        const review = await Review.findOneAndUpdate(
            {
                user: req.userId,
                movieId: parsedMovieId,
            },
            {
                $set: {
                    userName: user.name,
                    movieTitle:
                        typeof movieTitle === "string" ? movieTitle.trim().slice(0, 200) : "",
                    rating: parsedRating,
                    comment: comment.trim(),
                },
                $setOnInsert: {
                    user: req.userId,
                    movieId: parsedMovieId,
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        )

        res.status(200).json({
            success: true,
            message: 'Review saved successfully',
            review,
        })
    } catch (error) {
        console.error(error.message)

        res.status(500).json({
            success: false,
            message: 'Failed to save review',
        })
    }
}

const getMovieReviews = async (req, res) => {
    try {
        const movieId = Number(req.params.movieId)

        if (!Number.isInteger(movieId) || movieId <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid movie ID',
            })
        }

        const reviews = await Review.find({ movieId })
            .select('userName rating comment createdAt updatedAt')
            .sort({ updatedAt: -1 })

        const averageRating = reviews.length
            ? Number(
                (
                    reviews.reduce(
                        (sum, review) => sum + review.rating,
                        0
                    ) / reviews.length
                ).toFixed(1)
            )
            : 0

        res.json({
            success: true,
            count: reviews.length,
            averageRating,
            reviews,
        })
    } catch (error) {
        console.error(error.message)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews',
        })
    }
}

module.exports = {
    createOrUpdateReview,
    getMovieReviews,
}