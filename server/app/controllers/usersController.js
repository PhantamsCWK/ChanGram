import User from "../models/User.js";

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
        const username = req.user.username;

        if(unique === username) {
            res.status(400)
            next({ name: "BadRequest", message: "can't follow own account" })
            return
        }

        const followUser = await User.findOne({ username: unique });
        const currentUser = await User.findOne({ username });

        let updatedFollowUser;
        let updatedCurrentUser;

        if (currentUser.following.includes(followUser._id)) {
            // Delete currentUser Id in Follower followUser
            updatedFollowUser = await User.findOneAndUpdate(
                { username: unique, updatedAt: followUser.updatedAt }, 
                { 
                    $pull: { follower: currentUser._id },
                    $inc: { followerCount: -1 }
                },
                { new: true }
            );
            
            // Delete followUser Id in Following currentUser
            updatedCurrentUser = await User.findOneAndUpdate(
                { username: username, updatedAt: currentUser.updatedAt }, 
                {
                    $pull: { following: followUser._id },
                    $inc: { followingCount: -1 }
                },
                { new: true }
            );

        } else {
            // Add currentUser Id in Follower followUser
            updatedFollowUser = await User.findOneAndUpdate(
                { username: unique, updatedAt: followUser.updatedAt }, 
                { 
                    $addToSet: { follower: currentUser._id },
                    $inc: { followerCount: 1 }
                },
                { new: true }
            );
            
            // Add followUser Id in Following currentUser
            updatedCurrentUser = await User.findOneAndUpdate(
                { username: username, updatedAt: currentUser.updatedAt }, 
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

