import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { unique } = req.params;

        const user = await User.findOne({ username: unique });

        if (!user) return res.status(400).json({ message: "invalid request" });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getFollowingUser = async (req, res) => {
    try {
        const { unique } = req.params;

        const user = await User.findOne({ username: unique });

        const following = await Promise.all(
            user.following.map(follow => User.findById(follow, { password: 0 }))
        );

        res.status(200).json({ following });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getFollowerUser = async (req, res) => {
    try {
        const { unique } = req.params;

        const user = await User.findOne({ username: unique });

        const follower = await Promise.all(
            user.follower.map(follow => User.findById(follow, { password: 0 }))
        );

        res.status(200).json({ follower });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addRemoveFollow = async (req, res) => {
    try {
        const { unique } = req.params;
        const user_id = req.user._id;

        const followUser = await User.findOne({ username: unique });
        const currentUser = await User.findById(user_id);

        if (currentUser.following.includes(followUser._id.toString())) {
            currentUser.following = currentUser.following.filter(follow => follow !== followUser._id.toString());
            followUser.follower = followUser.follower.filter(follow => follow !== user_id);
        } else {
            currentUser.following.push(followUser._id.toString());
            followUser.follower.push(user_id);
        }


        await User.findByIdAndUpdate(followUser._id, { follower: followUser.follower });
        const updatedCurrentUser = await User.findByIdAndUpdate(user_id, { following: currentUser.following }, { new: true });

        res.status(202).json({ following: updatedCurrentUser.following, follower: updatedCurrentUser.follower });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

