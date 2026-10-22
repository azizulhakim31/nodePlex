const express = require("express");

const protect = require("../middleware/authMiddleware")

const { createOrUpdateReview, getMovieReviews, deleteReview } = require("../controllers/reviewController")

const router = express.Router()

router.get("/:movieId", getMovieReviews)
router.post("/", protect, createOrUpdateReview)
router.delete("/:movieId", protect, deleteReview)

module.exports = router