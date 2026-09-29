const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

const generateToken = (userId) => {
    return jwt.sign(
        { userId }, process.env.JWT_SECRET_KEY,
        { expirenIn: process.env.JWT_EXPIRES_IN }
    )
}