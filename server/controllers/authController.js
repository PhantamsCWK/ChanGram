import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt);

        const createUser = new User({ username, password: passwordHash, email });

        const userAccount = await createUser.save();

        res.status(201).json({ userAccount });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });

        if(!user) return res.status(400).json({ message: "User or Password Wrong"});
        
        const isCorrect = bcrypt.compareSync(password, user.password);

        if(!isCorrect) return res.status(400).json({ message: "User or Password Wrong"});

        const accessToken = jwt.sign(
            { username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "12h" }
        );

        const refreshToken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("jwt", refreshToken, {
            httpOnly: true, //accessible only by web server 
            // secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000
         });

        user.password = undefined;

        res.status(202).json({ accessToken, user });

    } catch (error) {
        res.status(400);
        next(error);
    }
};


export const refreshToken = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies?.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET, 
        async (err, decode) => {
            if (err) res.sendStatus(403);

            const user = await User.findById(decode?._id);

            if (!user) res.sendStatus(401);

            const accessToken = jwt.sign(
                { username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30s" }
            );

            res.status(200).json({ accessToken });
        }
    )
}

export const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}
