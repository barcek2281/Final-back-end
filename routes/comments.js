const express = require('express');
const router = express.Router();
const Post = require('../model/Post');
const Comment = require("../model/comment")
const middleware = require("../middleware/middleware");

// Добавление комментария
router.post('/:id/comment', middleware,  async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log("lol")
            return res.redirect("/")
        }
        let user = req.user;
        const post_id = req.params.id;

        const comment = new Comment({
            author: user.login,
            text: req.body.text,
            post_id: post_id
        })

        await comment.save();
        res.redirect("/")
    } catch (error) {
        console.error("❌ Ошибка при добавлении комментария:", error);
        res.status(500).send('Server Error');
    }
});

router.get('/:id/comment',  async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log("cannot find post")
            return res.redirect("/")
        }
        let user = req.user;
        const post_id = req.params.id;

        const comment = new Comment({
            author: user.login,
            text: req.body.text,
            post_id: post_id
        })

        await comment.save();
        return res.json(comment)
    } catch (error) {
        console.error("❌ Ошибка при добавлении комментария:", error);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
