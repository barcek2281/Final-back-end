const { default: mongoose } = require("mongoose");

const schemaAdmin = new mongoose.Schema({
    login: String,
    email: String,
    password: String,
})

module.exports = mongoose.model("admin", schemaAdmin)