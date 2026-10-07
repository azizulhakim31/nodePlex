const express = require("express")

const protect = require("../middleware/authMiddleware")

const { addToWatchlist, getWatchlist, removeFromWatchlist } = require("../controllers/watchlistController")

const router = express.Router()

router.use(protect)

router.post("/", addToWatchlist)
router.get("/", getWatchlist)
router.delete("/:movieId", removeFromWatchlist)

module.exports = router