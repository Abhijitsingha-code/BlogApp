
const router = require("express").Router();
const Post = require("../Models/Post.js");

//Create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      res.status(401).json("You can update your posts only.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const postToDelete = await Post.findById(req.params.id);
    if (postToDelete.userId === req.body.userId) {
      try {
        await postToDelete.deleteOne();
        res.status(200).json("Post has been deleted");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      res.status(401).json("You can delete your posts only.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Find post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json("Post not found");
  }
});

//Find all post
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if(username){
        posts = await Post.find({username})
    }else if(catName){
      posts = await Post.find({categories:{
        $in:[catName]
      }
      })
    }else{
      posts = await Post.find()
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json("Post not found");
  }
});



module.exports = router;
