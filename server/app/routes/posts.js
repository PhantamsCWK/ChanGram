import { Router } from "express";
import { verification } from "../middleware/auth.js";
import { createPost, deletePost, getAllPosts, getPostById, getUserPosts, likePost } from "../controllers/postsController.js";
import upload from "../middleware/upload.js";
import { createPostValidation, updatePostValidation } from "../middleware/validation/post.js";

const router = Router();

router.get("/", verification, getAllPosts);
router.get("/:author/user", verification, getUserPosts);
router.get("/:id", verification, getPostById);

router.post("/", verification, upload.single("picture"), createPostValidation, createPost);

router.delete("/:id", verification, deletePost);

router.patch("/:id/like", verification, updatePostValidation, likePost);


export default router;

