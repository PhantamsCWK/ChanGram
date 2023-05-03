import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const verification = (req, res, next) => {
    let token = req.headers.authorization;

 
    if (!token) return res.status(403).json({ message: "Access denied"});

    if (!token.startsWith("Bearer ")) return res.status(403).json({ message: "Access denied"});

    token = token.slice(7, token.length).trimStart();

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decode) => {
            if (err) return res.sendStatus(403)

            req.user = decode;
            next();
        }
    )
};