const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    photo: { type: String, required: false },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    categories: { type: Array, required: false },
    comments: [
      {
        commentBody: String,
        userComment: String,
        userId: String,
        userphoto: { type: String, required: false },
        commentedOn: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
