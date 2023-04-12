import { Router } from "express";
import { loginValidation, registerValidation } from "../middleware/validation/auth.js";
import { login, register } from "../controllers/authController.js";

const router = Router();

router.post("/login", loginValidation, login);
router.post("/register", registerValidation, register );

export default router;