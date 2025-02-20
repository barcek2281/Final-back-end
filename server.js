const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);




/*
const Post = require('./model/Post.js'); // Assuming you create a Post model

app.get("/", async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch posts from DB
        res.render("index", { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
*/





const Post = require('./model/Post'); // Import Post model

app.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // Get posts, latest first
        res.render("index", { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});




app.listen(PORT, 
    () => {
        console.log(`Server running: http://localhost:${PORT}`)
    })