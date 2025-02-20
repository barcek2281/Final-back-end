const express = require("express");
const router = express.Router();
const Post = require("../model/Post");

// Create a post
router.post("/", async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content
        });
        await newPost.save();
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error creating post");
    }
});

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).send("Error fetching posts");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Post not found");
        }
        res.render("postDetail", { post });
    } catch (err) {
        res.status(500).send("Error fetching post");
    }
});

/* Get a single post by ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Post not found");
        }
        res.json(post);
    } catch (err) {
        res.status(500).send("Error fetching post");
    }
});
*/

// Update a post
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title: req.body.title, content: req.body.content },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).send("Post not found");
        }
        res.json(updatedPost);
    } catch (err) {
        res.status(500).send("Error updating post");
    }
});

// Delete a post
router.delete("/:id", async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).send("Post not found");
        }
        res.send("Post deleted successfully");
    } catch (err) {
        res.status(500).send("Error deleting post");
    }
});

module.exports = router;
