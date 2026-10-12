const express = require("express");

const protect = require("../middleware/authMiddleware")

const { createOrUpdateReview, getMovieReviews } = require("../controllers/reviewController")

const router = express.Router()

router.get("/:movieId", getMovieReviews)
router.post("/", protect, createOrUpdateReview)

module.exports = router