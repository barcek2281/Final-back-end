const express = require('express');
const router = express.Router();

router.get("/register", async (req, res) => {
    res.render("register");
});

// Регистрация
router.post('/register', (req, res) => {
    res.send('User registered');
});

router.get("/login", async (req, res) => {
    res.render("login");
});

// Вход в систему
router.post('/login', (req, res) => {
    res.send('User logged in');
});

module.exports = router;
