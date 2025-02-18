const express = require('express');
const router = express.Router();

// Регистрация
router.post('/register', (req, res) => {
    res.send('User registered');
});

// Вход в систему
router.post('/login', (req, res) => {
    res.send('User logged in');
});

module.exports = router;
