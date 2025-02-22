const { default: mongoose } = require("mongoose");

const schemaComment = new mongoose.Schema({
    author: string,
    comment: string,
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("comment", schemaComment);