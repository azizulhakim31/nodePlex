const express = require("express");

const { getTrending, getPopular, searchMovies, getMovie } = require("../controllers/movieController")

const router = express.Router()

router.get("/trending", getTrending)
router.get("/popular", getPopular)
router.get("/search", searchMovies)
router.get("/:id", getMovie)

module.exports = router