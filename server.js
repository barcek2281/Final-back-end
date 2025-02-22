const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

// Загрузка переменных окружения
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ Ошибка: MONGO_URI не задан в .env");
    process.exit(1);
}

// Инициализация Express
const app = express();

// Подключение к MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB подключена");
    } catch (err) {
        console.error("❌ Ошибка подключения к MongoDB:", err);
        process.exit(1);
    }
}

connectDB();

// Логирование ошибок MongoDB
mongoose.connection.on("error", (err) => {
    console.error("❌ Ошибка подключения к БД:", err);
});

// Middleware
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json()); // Встроенный парсер JSON
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Настройки EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Импорт моделей
const Post = require("./model/Post");
const Comment = require("./model/comment");

// Подключение маршрутов
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Главная страница с постами
app.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.render("index", { posts, user: req.user || null });
    } catch (err) {
        console.error("❌ Ошибка загрузки постов:", err);
        res.status(500).send("Ошибка сервера");
    }
});

// Страница изменений (changelog) с комментариями
app.get("/changelog", async (req, res) => {
    const updates = [
        { title: "Version 1.2", description: "Added new features and fixed bugs." },
        { title: "Version 1.1", description: "Improved performance and security." },
        { title: "Version 1.0", description: "Initial release." }
    ];

    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.render("changelog", { updates, comments, user: req.user || null });
    } catch (err) {
        console.error("❌ Ошибка загрузки комментариев:", err);
        res.status(500).send("Ошибка сервера");
    }
});

// Статические страницы
app.get("/about", (req, res) => {
    res.render("about", { user: req.user || null });
});

app.get("/download", (req, res) => {
    res.render("download", { user: req.user || null });
});
app.get("/index", (req, res) => {
    res.redirect("/");
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
