const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Chapter = require("./models/Chapter");

const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");

app.use(express.static(path.join(__dirname, "Welcome")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Welcome", "home.html"));
})


// Connect to MongoDB
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("✅ Successfully connected to MongoDB!"))
        .catch(err => console.log("❌ Database connection error!", err));
}



// GET: 5 Latest chapter 
app.get("/api/chapters/latest", async (req, res) => {
    try {
        const latestChapters = await Chapter.find().sort({ createdAt: -1 }).limit(5);
        res.json(latestChapters);
    } catch (error) {
        res.status(500).json({ message: "Server error when retrieving chapters" });
    }
});



// POST: Add new chapter
app.post("/api/chapters", async (req, res) => {
    try {
        const { mangaTitle, chapterNumber, coverUrl, isNewChapter } = req.body;

        const newChapter = new Chapter({ 
            mangaTitle, 
            chapterNumber, 
            coverUrl, 
            isNewChapter 
        });

        await newChapter.save();
        res.status(201).json({ message: "Chapter added successfully!", chapter: newChapter });
    } catch (error) {
        console.log("Error details:", error);
        res.status(400).json({ message: "Error saving chapter", error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 The server is running on http://localhost:${PORT}`);
});
