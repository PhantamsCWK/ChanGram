import User from "../models/User.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";

export const getUser = async (req, res, next) => {
    try {
        const { unique } = req.params;

        const user = await User.findOne({ username: unique }, { password: 0, });

        if (!user) return res.status(400).json({ message: "invalid request" });

        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
}

export const searchUser = async (req, res, next) => {
    try {
        const username = req.query.username;

        if(!username){
            res.status(404)
            next({ name: "BadRequest", message: "invalid query params" })
            return
        }

        const users = await User.find({ username: { $regex: new RegExp(username, "i") }}, { username: 1, name: 1, photoPath: 1,  }).limit(15);

        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
}

export const getFollowingUser = async (req, res, next) => {
    try {
        const { unique } = req.params;

        const user = await User.findOne({ username: unique });

        const following = await Promise.all(
            user.following.map(follow => User.findById(follow, { _id: 0, username: 1, firstName: 1, lastName: 1, picturePath: 1, following: 1, follower: 1 }))
        );

        res.status(200).json({ following });
    } catch (error) {
        next(error);
    }
}

export const getFollowerUser = async (req, res, next) => {
    try {
        const { unique } = req.params;

        const user = await User.findOne({ username: unique });

        const follower = await Promise.all(
            user.follower.map(follow => User.findById(follow, { _id: 0, username: 1, firstName: 1, lastName: 1, picturePath: 1, following: 1, follower: 1 }))
        );

        res.status(200).json({ follower });
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { unique } = req.params;

        const deletedUser = await User.deleteOne({ username: unique });

        res.status(200).json({ deletedUser })

    } catch (error) {
        next(error)
    }
}

export const addRemoveFollow = async (req, res, next) => {
    try {
        const { unique } = req.params;
        const authId = req.user.id;

        const followUser = await User.findOne({ username: unique });
        const currentUser = await User.findById(authId);

        if(unique === currentUser.username) {
            res.status(400)
            next({ name: "BadRequest", message: "can't follow own account" })
            return
        }

        let updatedFollowUser;
        let updatedCurrentUser;

        if (currentUser.following.includes(followUser._id)) {
            // Delete currentUser Id in Follower followUser
            updatedFollowUser = await User.findOneAndUpdate(
                { _id: followUser.id, updatedAt: followUser.updatedAt }, 
                { 
                    $pull: { follower: currentUser._id },
                    $inc: { followerCount: -1 }
                },
                { new: true }
            );
            
            // Delete followUser Id in Following currentUser
            updatedCurrentUser = await User.findOneAndUpdate(
                { _id: currentUser.id, updatedAt: currentUser.updatedAt }, 
                {
                    $pull: { following: followUser._id },
                    $inc: { followingCount: -1 }
                },
                { new: true }
            );

        } else {
            // Add currentUser Id in Follower followUser
            updatedFollowUser = await User.findOneAndUpdate(
                { _id: followUser.id, updatedAt: followUser.updatedAt }, 
                { 
                    $addToSet: { follower: currentUser._id },
                    $inc: { followerCount: 1 }
                },
                { new: true }
            );
            
            // Add followUser Id in Following currentUser
            updatedCurrentUser = await User.findOneAndUpdate(
                { _id: currentUser.id, updatedAt: currentUser.updatedAt }, 
                { 
                    $addToSet: { following: followUser._id },
                    $inc: { followingCount: 1 }
                },
                { new: true }
            );
        }



        res.status(202).json({ 
            users: [ 
                updatedCurrentUser, 
                updatedFollowUser 
            ] 
        });
    } catch (error) {
        next(error);
    }
}

export const editUser = async (req, res, next) => {
    const { name, bio, gender } = req.body;

    const authId = req.user.id;

    try {
        const updatedUser = await User.updateOne(
            { _id: authId }, 
            { $set: { name, bio, gender }} , 
            { new: true }
            );
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(400);
        next(error);
    }
}

export const editPhotoUser = async (req, res, next) => {
    const authId = req.user.id;
    const photo = req.file

    if(!photo){
        res.status(400);
        next({ message: "request need file" });
        return
    }

    const user = User.findById(authId);

    if(user.photoPath && user.photoId){
        await cloudinary.uploader.destroy(user.photoId);
    }

    const newUser = await User.updateOne(
        { _id: authId },
        { $set: { 
            photoPath: photo.path,
            photoId: photo.filename
        } },
        { new: true }
    )

    res.status(202).json({ user: newUser });
}

export const editUsername = async (req, res, next) => {
    const { password, username: newUsername } = req.body
    const authId = req.user.id;

    if (!password || !newUsername) {
        res.status(400);
        next({ message: "password and new username require" })
        return;
    }

    const user = await User.findById(authId);

    if (newUsername === user.username){
        res.status(400);
        next({ message: "new username cannot same with old username" })
        return;
    }


    const isDuplicated = await User.findOne({ username: newUsername })

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
        res.status(400)
        next({ message: "password wrong" })
        return
    }

    if (isDuplicated) {
        res.status(400)
        next({ message: "username already pick" })
        return
    }

    const newUser = await User.updateOne(
        { _id: authId },
        { $set: { username: newUsername } },
        { new: true }
    )

    res.status(202).json({ user: newUser });
}

export const editEmail = async (req, res, next) => {
    const { email: newEmail } = req.body
    const authId = req.user.id;

    if(!newEmail) {
        res.status(400);
        next({ message: "email require" });
        return
    } 

    const emailValidation = (email) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const filter = email.match(pattern);
        if (!filter) {
            res.status(400).json({ message: "bad request" })
            return
        }

        return filter[0];
    }

    const filteredEmail = emailValidation(newEmail);

    const isDuplicated = await User.findOne({ email: filteredEmail });
    
    if (isDuplicated) {
        res.status(400);
        next({ message: "email already pick in another account" });
        return;
    }
    const newUser = await User.updateOne(
        { _id: authId },
        { $set: { email: filteredEmail } },
        { new: true }
    )

    res.status(202).json({ user: newUser });
}

export const editPhoneNumber = async (req, res, next) => {
    const { phone: newPhone } = req.body
    const authId = req.user.id;

    if(!newPhone) {
        res.status(400);
        next({ message: "need phone number" });
        return
    }

    const extractPhoneNumber = (phoneNumber) => {
        const pattern = /\d/g;
        const digits = phoneNumber.match(pattern);
        if(!digits) {
            res.status(400).json({ message: "bad request" })
            return
        }
        const extractedNumber = digits.join("");
        return extractedNumber;
    }

    const filteredNumber = extractPhoneNumber(newPhone)

    const isDuplicated = await User.findOne({ phoneNumber: filteredNumber });

    if (isDuplicated) {
        res.status(400);
        next({ message: "phone number already pick in another account" });
        return;
    }

    const newUser = await User.updateOne(
        { _id: authId },
        { $set: { phoneNumber: filteredNumber } },
        { new: true }
    )

    res.status(202).json({ user: newUser });
}
