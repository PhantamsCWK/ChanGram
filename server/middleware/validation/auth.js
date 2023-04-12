import { body, check, validationResult } from "express-validator";
import User from "../../models/User.js";

export const registerValidation = async (req, res, next) => {
    await body("username").isString().isLength({ min: 4 }).withMessage("username must be min 4 length")
    .custom(async input => {
        const user = await User.findOne({ username: input });
        if(user){
            return await Promise.reject("Username already taken")
        }
    }).run(req);

    await body("email").isString().isEmail().withMessage("must be vali email")
    .custom(async input => {
        const user = await User.findOne({ email: input });
        if(user){
            return await Promise.reject("Email already taken")
        }
    }).run(req);

    await body("password").isString().isLength({ min: 3 }).withMessage("password must be min 3 length").run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
}

export const loginValidation = async (req, res, next) => {
    await body("email").isString().isEmail().withMessage("must be vali email").run(req);
    await body("password").notEmpty().withMessage("password invalid").run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
}