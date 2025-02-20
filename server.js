const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const { default: mongoose } = require("mongoose");
dotenv.config();
const PORT = process.env.PORT || 3000;

const Post = require('./model/Post'); // may not work
const connectDB = require("./config/db");

const app = express();
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
// Middleware
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);



app.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // Get posts, latest first
        res.render("index", { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});




// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
