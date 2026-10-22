const User = require("../models/User")

const updateProfile = async (req, res) => {
    const { name, email } = req.body || {}

    if (typeof name !== "string" || typeof email !== "string") {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        })
    }

    const normalizedName = name.trim()
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedName) {
        return res.status(400).json({
            success: false,
            message: "Name cannot be empty"
        })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        return res.status(400).json({
            success: false,
            message: "Enter a valid email address"
        })
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: { name: normalizedName, email: normalizedEmail } },
            { new: true, runValidators: true, select: "name email" }
        )

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            })
        }

        console.error(error.message)
        res.status(500).json({
            success: false,
            message: "Failed to update profile"
        })
    }
}

module.exports = { updateProfile }
