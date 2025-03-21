const express = require('express');
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const router = express.Router();
const Post = require('../model/Post');

// Главная страница с постами
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        const token = req.cookies.token;
        if (!token) {
            return res.render("index", { posts, user:  null });
        }
        const token_jwt = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(token_jwt.id);
        if (!user) {
            return res.render("index", { posts, user:  null });
        }
        res.render("index", { posts, user:  user });

    } catch (err) {
        if (err.message == "jwt expired") {

            res.clearCookie("token")
            res.redirect("/");
            return
        }
        console.error("❌ Ошибка загрузки постов:", err.message);
        res.status(500).render("error", { message: "Ошибка сервера. Попробуйте позже." });
    }
});

router.get("/changelog", async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.render("changelog", { updates, comments, user: req.user || null });
    } catch (err) {
        console.error("❌ Ошибка загрузки комментариев:", err);
        res.status(500).send("Ошибка сервера");
    }
});

// Статические страницы
router.get("/about", (req, res) => {
    res.render("about", { user: req.user || null });
});

router.get("/download", (req, res) => {
    res.render("download", { user: req.user || null });
});
router.get("/index", (req, res) => {
    res.redirect("/");
});

router.get("/download-game", (req, res) => {
    res.render("download-game", { user: req.user || null });
});



module.exports = router;