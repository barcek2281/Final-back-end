const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const middleware = require("../middleware/middleware");
const middlewareAdmin = require("../middleware/middlewareAdmin");


router.get("/", middlewareAdmin, async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render("createPost", {user: req.user, posts: posts, error:null})
});

router.post("/", middlewareAdmin,  async (req, res) => {
    try {
        const { title, content } = req.body;
        const posts = await Post.find().sort({ createdAt: -1 });
        if (!title || !content) {
            return res.render("createPost", {user:req.user, posts:posts,  error: "Title and content are required" });
        }
        const newPost = new Post({  title,
                                    content,    
                                    author: req.user.login});
        await newPost.save();
        
        res.redirect("/")
    } catch (err) {
        console.error("Ошибка создания поста:", err);
        return res.render("createPost", {user:req.user, posts:posts,  error: err});
    }
});


router.get("/:id", middlewareAdmin, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.render("post", {post: null, error:"cannot find post!"})
        }
        res.render("post", {post: post, error:null})
    } catch (err) {
        console.error(" Ошибка получения поста:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/:id", middlewareAdmin, async (req, res) => {
    try {
        const del = req.query._method;
        if (del === "DELETE") {
            const deletedPost = await Post.findByIdAndDelete(
                req.params.id,
            );

            if (!deletedPost) {
                return res.render("post", {post: null, error:"cannot find post!"})
            }
            console.log(`post deleted: ${deletedPost.title}`);
        }else{
            const { title, content } = req.body;
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                { title, content },
            );

            if (!updatedPost) {
                return res.render("post", {post: null, error:"cannot find post!"})
            }
            console.log(`post updated: ${updatedPost.title}`);
        }
        res.redirect(".")
    } catch (err) {
        console.error(" Ошибка обновления поста:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/:id", middleware, async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        console.log(`Пост удален: ${deletedPost.title}`);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error(" Ошибка удаления поста:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
