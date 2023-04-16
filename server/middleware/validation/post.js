import { body, validationResult } from "express-validator";
import User from "../../models/User.js";

export const createPostValidation = async (req, res, next) => {
    await body("author").isString().trim().custom(async input => {
        const user = await User.findById(req.user._id);
        if(input !== user.username){
            return await Promise.reject("invalid request");
        }
    }).run(req);

    await body("description").isString().run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
}

export const updatePostValidation = (req, res, next) => {
    next();
}