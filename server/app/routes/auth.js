import { Router } from "express";
import { loginValidation, registerValidation } from "../middleware/validation/auth.js";
import { login, register, refreshToken, logout } from "../controllers/authController.js";
import { loginRateLimit } from "../middleware/rateLimit.js";

const router = Router();

router.post("/login", loginRateLimit, loginValidation, login);
router.post("/register", registerValidation, register );
router.get("/refresh", refreshToken);
router.get("/logout", logout);

export default router;