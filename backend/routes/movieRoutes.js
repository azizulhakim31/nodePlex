const express = require("express");

const { getTrending, getPopular, searchMovies } = require("../controllers/movieController")

const router = express.Router()

router.get("/trending", getTrending)
router.get("/popular", getPopular)
router.get("/search", searchMovies)

module.exports = router