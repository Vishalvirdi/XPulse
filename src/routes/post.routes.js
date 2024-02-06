import { Router } from "express";
import { addComment, createPost, deletePost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router
  .route("/create-post")
  .post(verifyJWT, upload.single("postFile"), createPost);
router
  .route("/delete-post")
  .delete(deletePost);

  router
  .route("/comment-on-post")
  .delete(verifyJWT,addComment);

export default router;