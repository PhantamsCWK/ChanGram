import { body, validationResult } from "express-validator";

export const createPostValidation = async (req, res, next) => {

    await body("description").isString().run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
}

export const updatePostValidation = (req, res, next) => {
    next();
}