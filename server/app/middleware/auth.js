import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const verification = async (req, res, next) => {
    let token = req.headers.authorization;
 
    if (!token) return res.status(403).json({ message: "Access denied"});

    if (!token.startsWith("Bearer ")) return res.status(403).json({ message: "Access denied"});

    token = token.slice(7, token.length).trimStart();

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decode) => {
            if (err) return res.status(403).json({ message: err });

            const isActiveUser = await User.findById(decode.id);

            if(!isActiveUser) return res.status(403).json({ message: "Access denied"})

            req.user = decode;
            next();
        }
    )
};