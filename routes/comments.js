const express = require('express');
const router = express.Router();
const Post = require('../model/Post'); // ✅ Исправлен путь

// Добавление комментария
router.post('/posts/:id/comment', async (req, res) => {
    try {
        console.log("Post ID:", req.params.id);
        console.log("User:", req.user);
        console.log("Comment text:", req.body.comment);

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const author = req.user && req.user.username ? req.user.username : "Anonim";

        const comment = {
            author: author,
            text: req.body.comment,
            date: new Date().toLocaleString(),
        };

        if (!post.comments) post.comments = []; // ✅ Гарантируем, что массив есть
        post.comments.push(comment);
        await post.save();

        res.redirect('/index'); // ✅ Или сделай редирект на страницу поста
    } catch (error) {
        console.error("❌ Ошибка при добавлении комментария:", error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
