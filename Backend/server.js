require("dotenv").config(); // Load .env variables

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.NEWS_API_KEY; // Use from .env

app.get("/news", async (req, res) => {
    const query = req.query.q || "india";
    const url = `https://gnews.io/api/v4/search?q=${query}&apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

