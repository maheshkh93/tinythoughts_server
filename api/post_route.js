import { Router } from "express";
import Post from "../models/post_schema.js";
import Like from "../models/like_schema.js";
import Comment from "../models/comment_schema.js";
import protectApi from "../utils/protection.js";

const postRoutes = Router();

//Create a post
postRoutes.post("/posts/create", protectApi, async (req, res) => {
  const action = await Post.create(req.body);
  return res.json(action ? { result: true, post: action } : { result: false });
});

//Read all post
postRoutes.get("/posts/get-posts", protectApi, async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  return res.json({ posts });
});

//delete a post
postRoutes.delete("/posts/delete/:id", protectApi, async (req, res) => {
  let id = req.params.id;
  const action = await Post.findByIdAndDelete(id);
  return res.json(action ? { result: true } : { result: false });
});

//update a post
postRoutes.patch("/posts/update", protectApi, async (req, res) => {
  let id = req.query.id;
  let update = req.body;
  const action = await Post.findByIdAndUpdate(id, update);
  return res.json(action ? { result: true } : { result: false });
});

//Like a post
postRoutes.post("/posts/like", protectApi, async (req, res) => {
  let email = req.body.email;
  let postId = req.body.postId;

  const search = await Like.find({ email: email, postId: postId });
  console.log(search);
  if (search.length > 0) {
    return res.json({
      result: "You can like only once",
    });
  } else {
    await Like.create(req.body);
  }
  const likes = await Like.find({ postId: postId });
  const updateAction = await Post.findByIdAndUpdate(postId, {
    likes: likes.length,
  });
  return res.json(updateAction ? { result: likes.length } : { result: null });
});

//Comment a post
postRoutes.post("/posts/comment", protectApi, async (req, res) => {
  let postId = req.body.postId;

  await Comment.create(req.body);
  const comments = await Comment.find({ postId: postId });
  const updateAction = await Post.findByIdAndUpdate(postId, {
    comments: comments.length,
  });
  return res.json(
    updateAction ? { result: comments.length } : { result: null }
  );
});

export default postRoutes;
