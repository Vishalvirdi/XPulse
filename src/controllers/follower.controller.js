import { Follower } from "../models/followers.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleFollowers = asyncHandler(async (req, res) => {
  const { profileId } = req?.params;

  // Check if the user is already following the profile
  const isFollowing = await Follower.findOne({
    follower: req?.user?._id,
    profile: profileId,
  });

  if (isFollowing) {
    // If the user is already following, remove the follower
    await Follower.deleteOne({ follower: req?.user?._id, profile: profileId });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Follower removed successfully"));
  } else {
    // If the user is not following, add the follower
    const follow = await Follower.create({
      follower: req?.user?._id,
      profile: profileId,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, follow, "Follower added successfully"));
  }
});
export { toggleFollowers };
