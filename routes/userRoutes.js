const express = require('express');
const router = express.Router();

// Создать пост
router.post('/', (req, res) => {
    res.send('Post created');
});

// Получить все посты
router.get('/', (req, res) => {
    res.send('List of all posts');
});

// Получить пост по ID
router.get('/:id', (req, res) => {
    res.send(`Post with ID ${req.params.id}`);
});

// Обновить пост
router.put('/:id', (req, res) => {
    res.send(`Post with ID ${req.params.id} updated`);
});

// Удалить пост
router.delete('/:id', (req, res) => {
    res.send(`Post with ID ${req.params.id} deleted`);
});

module.exports = router;
