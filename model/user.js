const { default: mongoose } = require("mongoose");

const schemaUser = new mongoose.Schema({
    login: String,
    email: String,
    password: String,
})


module.exports = mongoose.model("user", schemaUser)