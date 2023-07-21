import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    ref: "User",
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});

const Post = model("Post", postSchema);

export default Post;
