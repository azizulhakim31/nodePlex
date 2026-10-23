require('./dns-fix')

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db")

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "NodePlex is running"
    })
})

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "NodePlex API is running"
    })
})

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/dashboard", dashboardRoutes)

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
})