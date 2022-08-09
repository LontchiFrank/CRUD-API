const express = require("express");
const Post = require("../model/post.method");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drillayqx",
  api_key: "843213215477195",
  api_secret: "k8uPFILp9oWzyNXSomqccUf8uzs",
  secure: true,
});

// get the all post
//Read all post
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//create new post
router.post("/new", async (req, res) => {
  const { name, description } = req.body;
  console.log({ name, description });

  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    // console.log(result);
    const newPost = new Post({
      ...req.body,
      image: result.url,
    });
    try {
      const savePost = newPost.save();
      return res.status(200).json(savePost);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
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
