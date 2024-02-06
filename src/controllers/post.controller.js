import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const createPost = asyncHandler(async (req, res) => {
  const { caption, isPublished } = req.body;
  const postFileLocalPath = req.file?.path;
  if (!postFileLocalPath) {
    throw new ApiError(400, "Post file is required");
  }
  const post = await uploadOnCloudinary(postFileLocalPath);
  const postData = await Post.create({
    postFile: post?.url || "",
    mediaId: post.public_id || "",
    caption,
    isPublished,
    owner: req?.user?._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, postData, "Post created Successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  console.log(postId);
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(401, "Post not found");
  }

  const mediaId = post?.mediaId;

  const response = await deleteFromCloudinary(mediaId);
  console.log(response);

  const deletedPost = await Post.deleteOne({ _id: postId });
  return res
    .status(200)
    .json(new ApiResponse(200, deletedPost, "Post deleted Successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  try {
    const { post, content } = req.body;
    console.log(post, content);
    const commentAdded = await Comment.create({
      content,
      post: post,
      owner: req?.user?._id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, commentAdded, "comment added Successfully"));
  } catch (error) {
    return res.status(401).json(new ApiError(401, error));
  }
});

async function hasAlreadyLiked(likedBy, post) {
  return like !== null;
}

const likePost = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.body;
    const isLiked = await Like.findOne({
      $or: [{ post: postId }, { likedBy: req?.user?._id }],
    });
    if (isLiked === null) {
      const likedPost = await Like.create({
        post: postId,
        likedBy: req?.user?._id,
      });
      return res
        .status(200)
        .json(new ApiResponse(200, likedPost, "Post liked Successfully"));
    } else {
      const disLike = await Like.findByIdAndDelete(isLiked?._id);
      return res
        .status(201)
        .json(new ApiResponse(200, disLike, "Post disliked Successfully"));
    }
  } catch (error) {
    return res.status(401).json(new ApiError(401, error));
  }
});

export { createPost, deletePost, addComment, likePost };
