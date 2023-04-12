import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const verification = (req, res, next) => {
    let token = req.headers.authorization;

 
    if (!token) return res.status(403).json({ message: "Access denied"});

    if (!token.startsWith("Shield ")) return res.status(403).json({ message: "Access denied"});

    token = token.slice(7, token.length).trimStart();

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = verifyToken;

    next();
};