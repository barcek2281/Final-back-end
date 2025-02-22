const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, default: "Anonim" },
    createdAt: { type: Date, default: Date.now },
    comments: [{  // Добавляем массив комментариев
        author: { type: String, default: "Anonim" },
        text: { type: String, required: true },
        date: { type: String, default: () => new Date().toLocaleString() }
    }]
});

module.exports = mongoose.model("Post", postSchema);
