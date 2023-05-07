import { Router } from "express";
import { verification } from "../middleware/auth.js";
import { addRemoveFollow, deleteUser, getFollowerUser, getFollowingUser, getUser } from "../controllers/usersController.js";

const router = Router();

router.get("/:unique", verification, getUser);
router.get("/:unique/following", verification, getFollowingUser);
router.get("/:unique/follower", verification, getFollowerUser);

router.delete("/:unique", verification, deleteUser);

router.patch("/:unique", verification, addRemoveFollow);

export default router;