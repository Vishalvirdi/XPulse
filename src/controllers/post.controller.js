import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

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
  if(!post){
    throw new ApiError(401, "Post not found");
  }

  const mediaId = post?.mediaId;

  const response = await deleteFromCloudinary(mediaId);
  console.log(response)

  const deletedPost = await Post.deleteOne({ _id: postId });
  return res
    .status(200)
    .json(new ApiResponse(200, deletedPost, "Post deleted Successfully"));
});

export { createPost, deletePost };
