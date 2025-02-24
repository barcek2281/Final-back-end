const express = require('express');
const router = express.Router();
const middleware = require("../middleware/middleware");
const User = require("../model/user");

// Получить профиль пользователя
router.get('/profile', middleware, async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.redirect("/")
    }
    res.render("profile", {user: user, error:null})
});

// Обновить профиль пользователя
router.post('/profile', middleware, async (req, res) => {
    const newLogin = req.body.newLogin;
    if (!newLogin) {
        return res.render("profile", {user: user, error:"you cant write empty string"});
    } 
    const user = await User.findById(req.user.id);
    if (!user){
        return
    }
    user.login = newLogin;
    await user.save();
    return res.render("profile", {user: user, error: "new login saved"});
});

module.exports = router;

