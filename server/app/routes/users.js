import { Router } from "express";
import { verification } from "../middleware/auth.js";
import { addRemoveFollow, deleteUser, editUser, getFollowerUser, getFollowingUser, getUser, searchUser } from "../controllers/usersController.js";

const router = Router();

router.get("/search", verification, searchUser);
router.get("/:unique", verification, getUser);
router.get("/:unique/following", verification, getFollowingUser);
router.get("/:unique/follower", verification, getFollowerUser);

router.delete("/:unique", verification, deleteUser);

router.patch("/", verification, editUser);
router.patch("/:unique/follow", verification, addRemoveFollow);

export default router;