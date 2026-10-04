const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db")

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "NodePlex is running"
    })
})

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})