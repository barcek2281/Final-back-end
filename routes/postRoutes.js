const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const middleware = require("../middleware/middleware");
const middlewareAdmin = require("../middleware/middlewareAdmin");


router.get("/", middlewareAdmin, async (req, res) => {
    res.render("createPost", {user: req.user, error:null})
});

router.post("/", middlewareAdmin,  async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.render("createPost", {user:req.user, error: "Title and content are required" });
        }
        const newPost = new Post({title,
                                content,    
                                author: req.user.login});
        await newPost.save();
        
        res.redirect("/")
    } catch (err) {
        console.error("❌ Ошибка создания поста:", err);
        res.status(500).json({ error: "Server error" });
    }
});


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

router.put("/:id", middleware, async (req, res) => {
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

router.delete("/:id", middleware, async (req, res) => {
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
