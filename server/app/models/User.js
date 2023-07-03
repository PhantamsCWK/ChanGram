import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
    },
    name: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photoPath: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
        default: []
    },
    follower: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users"  }],
        default: []
    },
    followingCount: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    followerCount: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    postsCount: {
        type: mongoose.Schema.Types.Number,
        default: 0
    }
}, { timestamps: true });

const User = mongoose.model("Users", UserSchema);

export default User;