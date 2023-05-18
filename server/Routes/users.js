const express = require("express");
const User = require("../Models/User.js");
const Post = require("../Models/Post.js");
const bcrypt = require("bcrypt");

const router = express.Router();

//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(401).json("You can update your account only.");
  }
});

//delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ userId: user._id });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } catch (error) {
      res.status(500).json("User not found");
    }
  } else {
    res.status(401).json("You can delete your account only.");
  }
});

//Find
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json("User not found");
  }
});

//Find all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    // const { password, ...others } = user._doc;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("User not found");
  }
});

module.exports = router;
