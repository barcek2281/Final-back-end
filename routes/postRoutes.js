const express = require("express");
const router = express.Router();
const Post = require("../model/Post");

// ✅ Создание поста (POST /posts)
router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        const newPost = new Post({ title, content });
        await newPost.save();
        console.log(`✅ Новый пост создан: ${title}`);
        res.status(201).json(newPost);
    } catch (err) {
        console.error("❌ Ошибка создания поста:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Получение всех постов (GET /posts)
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error("❌ Ошибка получения постов:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Получение одного поста по ID (GET /posts/:id)
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } catch (err) {
        console.error("❌ Ошибка получения поста:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Обновление поста (PUT /posts/:id)
router.put("/:id", async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        console.log(`✅ Пост обновлен: ${updatedPost.title}`);
        res.json(updatedPost);
    } catch (err) {
        console.error("❌ Ошибка обновления поста:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Удаление поста (DELETE /posts/:id)
router.delete("/:id", async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        console.log(`✅ Пост удален: ${deletedPost.title}`);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error("❌ Ошибка удаления поста:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
