const express = require('express');
const router = express.Router();
const Post = require('../model/Post');
const Comment = require("../model/comment")
const middleware = require("../middleware/middleware");
const jwt = require("jsonwebtoken");

router.get('/:id',  async (req, res) => {
    try {
        const post_id = req.params.id;
        const post = await Post.findById(post_id);

        if (!post) {
            console.log(`cannot find such a post: ${post_id}`)
            return res.redirect("/")
        }
        const comments = await Comment.find({post_id: post_id})
        if (!comments) {
            return res.render("post", {post: post, comments: null,  user: null})
        }

        const token = req.cookies.token;
        if (!token) {
            return res.render("post", {post: post, comments: comments,  user: null})
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);

        res.render("post", {post: post, comments: comments, user: user})
    } catch (error) {
        console.error("Error with show post:", error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
