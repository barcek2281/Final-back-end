const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const user = require("./model/user.js")


dotenv.config();
app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", (req, res) => {
    res.send("hello, world!");
})

app.listen(PORT, ()=>console.log(`Server running: http://localhost:${PORT}`))