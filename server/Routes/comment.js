const router = require("express").Router();
const Post = require("../Models/Post.js");
const mongoose = require("mongoose");

//Create comment
router.post("/", async (req, res) => {
  const { commentBody, userComment, userId, userphoto, id } = req.body;
  // const { id: _id } = req.params;
  // console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Post unavailable");
  }

  try {
    const comment = await Post.findByIdAndUpdate(id, {
      $addToSet: {
        comments: [{ commentBody, userComment, userId, userphoto }],
      },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete comment
router.patch("/:_id", async (req, res) => {
  const _id = req.params._id;
  const { commentId } = req.body;
  // console.log(_id, commentId);
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post unavailable");
  }

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).send("Comment unavailable...");
  }

  try {
    await Post.updateOne({ _id }, { $pull: { comments: { _id: commentId } } });
    res.status(200).json({ message: "Successfully Deleted..." });
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
