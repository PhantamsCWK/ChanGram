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

        console.log(unique)

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

        const followUser = await User.findOne({ username: unique });
        const currentUser = await User.findOne({ username });

        if (currentUser.following.includes(followUser._id.toString())) {
            currentUser.following = currentUser.following.filter(follow => follow !== followUser._id.toString());
            followUser.follower = followUser.follower.filter(follow => follow !== currentUser._id.toString());
        } else {
            currentUser.following.push(followUser._id.toString());
            followUser.follower.push(currentUser._id.toString());
        }


        await User.findOneAndUpdate({ username: unique}, { follower: followUser.follower });
        const updatedCurrentUser = await User.findOneAndUpdate({ username }, { following: currentUser.following }, { new: true });

        res.status(202).json({ following: updatedCurrentUser.following, follower: updatedCurrentUser.follower });
    } catch (error) {
        next(error);
    }
}

