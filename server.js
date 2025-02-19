const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");


dotenv.config();
const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)

// for css and js script
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes by adil
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
// routes end by adil


app.listen(PORT, 
    () => {
        console.log(`Server running: http://localhost:${PORT}`)
    })