const express = require("express");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "NodePlex is running"
    })
})

app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})