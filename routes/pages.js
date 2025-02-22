const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const Comment = require("../model/comment");

// About Page
router.get("/about", (req, res) => {
    res.render("about", { user: req.user });
});

// Download Page
router.get("/download", (req, res) => {
    res.render("download", { user: req.user });
});

// Changelog + Comments
router.get("/changelog", async (req, res) => {
    try {
        const updates = [
            { title: "Patch 1.1", description: "Fixed bugs, improved UI", date: "2025-02-20" },
            { title: "Patch 1.2", description: "New game mode added", date: "2025-02-25" }
        ];

        const comments = await Comment.find().sort({ createdAt: -1 });

        res.render("changelog", { user: req.user, updates, comments });
    } catch (err) {
        console.error(err);
        res.status(500).send("Ошибка сервера");
    }
});

// Post Comment (Only Authenticated Users)
router.post("/changelog/comment", async (req, res) => {
    if (!req.user) return res.redirect("/auth/login");

    try {
        await Comment.create({ author: req.user.username, text: req.body.comment });
        res.redirect("/changelog");
    } catch (err) {
        console.error(err);
        res.status(500).send("Ошибка при добавлении комментария");
    }
});

module.exports = router;
