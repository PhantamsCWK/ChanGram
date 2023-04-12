import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt);

        const createUser = new User({ username, password: passwordHash, email });

        const userAccount = await createUser.save();

        res.status(201).json({ userAccount });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });

        if(!user) return res.status(400).json({ message: "User or Password Wrong"});
        
        const isCorrect = bcrypt.compareSync(password, user.password);

        if(!isCorrect) return res.status(400).json({ message: "User or Password Wrong"});

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        user.password = undefined;

        res.status(202).json({ token, user });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};
