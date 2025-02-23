const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Загрузка переменных окружения
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Инициализация Express
const app = express();

// Подключение к MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB подключена");
    } catch (err) {
        console.error("Ошибка подключения к MongoDB:", err);
        process.exit(1);
    }
}

connectDB();

// for css and js
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json()); // Встроенный парсер JSON
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Настройки EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Подключение маршрутов
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const mainPage = require("./routes/mainPage");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/", mainPage);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
