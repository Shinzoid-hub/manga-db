const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
    mangaTitle: { type: String, required: true },
    chapterNumber: { type: String, required: true },
    coverUrl: { type: String, required: true },
    isNewChapter: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chapter", ChapterSchema);