const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
2
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/*
// Подключение к базе данных (временно отключено)
// const connectDB = require("./config/db");
// connectDB(); 

// const Post = require('./model/Post'); // Import Post model

app.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // Get posts, latest first
        res.render("index", { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
*/

// Временная заглушка
app.get("/", (req, res) => {
    res.render("index", { posts: [] }); // Отдаем пустой список постов
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
