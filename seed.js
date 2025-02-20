const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Post = require("./model/Post");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const samplePosts = [
    {
        title: "Elden Ring DLC Announced!",
        content: "FromSoftware has officially announced the highly anticipated DLC for Elden Ring, featuring new bosses, weapons, and an extended storyline..."
    },
    {
        title: "GTA 6 Release Date Leaked",
        content: "According to recent leaks, Grand Theft Auto 6 is set to release in 2025. Rockstar Games is expected to make an official announcement soon..."
    },
    {
        title: "Cyberpunk 2077 2.0 Update Brings Major Changes",
        content: "CD Projekt Red has released a massive 2.0 update for Cyberpunk 2077, improving AI, graphics, and introducing new gameplay mechanics..."
    }
];

const seedDB = async () => {
    try {
        await Post.deleteMany({}); // Clear old posts
        await Post.insertMany(samplePosts);
        console.log("Sample posts inserted!");
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

seedDB();
