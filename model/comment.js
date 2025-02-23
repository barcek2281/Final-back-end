const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    author: { type: String, default: "Anonim" },
    text: { type: String, required: true },
    post_id: { type: Schema.Types.ObjectId, ref: 'Post' , required: true}
}, { timestamps: true }); // Enables createdAt and updatedAt

// Create index on createdAt for faster sorting
commentSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Comment", commentSchema);
