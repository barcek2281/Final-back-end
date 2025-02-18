const express = require('express');
const router = express.Router();

// Получить профиль пользователя
router.get('/profile', (req, res) => {
    res.send('User profile data');
});

// Обновить профиль пользователя
router.put('/profile', (req, res) => {
    res.send('User profile updated');
});

module.exports = router;
