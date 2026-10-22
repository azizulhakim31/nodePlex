const express = require("express")
const protect = require("../middleware/authMiddleware")
const { updateProfile } = require("../controllers/userController")

const router = express.Router()

router.get("/profile", protect, (req, res) => {
    res.json({
        success: true,
        message: "You can access this protected route."
    })
})

router.patch("/profile", protect, updateProfile)

module.exports = router