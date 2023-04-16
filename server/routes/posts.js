import { Router } from "express";
import { verification } from "../middleware/auth.js";
import { createPost, deletePost, getAllPosts, getPostById, getUserPosts, likePost } from "../controllers/postsController.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/", verification, getAllPosts);
router.get("/:author/user", verification, getUserPosts);
router.get("/:id", verification, getPostById);

router.post("/", verification, upload.single("picture"), createPost);

router.delete("/:id", verification, deletePost);

router.patch("/:id/like", verification, likePost);


export default router;

