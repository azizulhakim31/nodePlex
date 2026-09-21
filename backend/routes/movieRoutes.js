const express = require("express");

const { getTrending, getPopular } = require("../controllers/movieController")

const router = express.Router()

router.get("/trending", getTrending)
router.get("/popular", getPopular)

module.exports = router