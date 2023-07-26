import { Router } from "express";
import { verification } from "../middleware/auth.js";
import { addRemoveFollow, deleteUser, editUser, getFollowerUser, getFollowingUser, getUser, searchUser, editPhotoUser, editUsername, editEmail, editPhoneNumber } from "../controllers/usersController.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/search", verification, searchUser);
router.get("/:unique", verification, getUser);
router.get("/:unique/following", verification, getFollowingUser);
router.get("/:unique/follower", verification, getFollowerUser);

router.delete("/:unique", verification, deleteUser);

router.patch("/", verification, editUser);
router.patch("/photo", verification, upload.single("photo"), editPhotoUser);
router.patch("/username", verification, editUsername);
router.patch("/email", verification, editEmail);
router.patch("/phone", verification, editPhoneNumber);
router.patch("/:unique/follow", verification, addRemoveFollow);

export default router;