const express = require("express");
const Post = require("../model/post.method");

// get the all post
//Read all post
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//create new post
router.post("/new", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    return res.status(200).json(savePost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//update the post
router.put("/update/:id", async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatePost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//delete the post
router.delete("/delete/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Post has been deleted successfully", post });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
