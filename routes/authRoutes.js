const express = require('express');
const router = express.Router();

router.get("/register", async (req, res) => {
    res.render("register"); // user автоматически доступен через res.locals
});

// Регистрация
router.post('/register', (req, res) => {
    res.send('User registered');
});

router.get("/login", async (req, res) => {
    res.render("login"); // user автоматически доступен через res.locals
});

// Вход в систему
router.post('/login', (req, res) => {
    res.send('User logged in');
});

module.exports = router;
