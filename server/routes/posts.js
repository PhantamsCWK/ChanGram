import { Router } from "express";
import { verification } from "../middleware/auth.js";
import { createPost, deletePost, getAllPosts, getUserPosts, likePost } from "../controllers/postsController.js";

const router = Router();

router.get("/", verification, getAllPosts);
router.get("/:id", getUserPosts);

router.post("/", createPost);

router.delete("/:id", deletePost);

router.patch("/:id/like", likePost);


export default router;

